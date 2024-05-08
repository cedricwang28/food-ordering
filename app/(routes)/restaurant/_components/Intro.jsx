import { MapPin } from 'lucide-react'
import Image from 'next/image'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useEffect,useState } from 'react' 

function Intro({restaurant}) {
  const [totalReview,setTotalReview] = useState()
    const [avgRating,setAvgRating] = useState(4.6)
    useEffect(()=>{
      restaurant&&CalculateRating()
    },[restaurant])
    const CalculateRating=()=>{
        let total = 0
        let count = 0
        restaurant?.reviews?.forEach(item=>{
            total += item.star
            count++
        })
        setTotalReview(count?count:9)
        const result = total/count
        setAvgRating(result?result.toFixed(1):4.6)
    }
  
  return (
    <div>
        {restaurant?.banner?.url? <div>
            <Image priority src={restaurant?.banner?.url}
            width={1000}
            height={300}
            alt='banner'
            className='w-full h-[220px] object-cover rounded-xl'
            />
        </div>:
        <div className='h-[220px] w-full bg-slate-200
         animate-pulse rounded-xl'>
        </div>}

        <h2 className='text-3xl font-bold mt-2'>{restaurant.name}</h2>
        <div className='flex items-center gap-2 mt-2'>
            <Image src={'/star.png'} alt='star'
            width={20} height={20}/>
            <label className=' text-gray-500'>{avgRating} ({totalReview})</label>
        </div>
        <h2 className='text-gray-500 mt-2 flex gap-2 items-center'>
            <MapPin/>
            {restaurant.address}</h2>
    </div>
  )
}

export default Intro