"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import BusinessItem from './BusinessItem';
import BusinessItemSkelton from './BusinessItemSkelton';

function BusinessList() {
    const params=useSearchParams();
    const [category,setCategory]=useState('all');
    const [businessList,setBusinessList]=useState([]);
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        params&&setCategory(params.get('category'))
        params?getBusinessList(params.get('category')):getBusinessList()
    },[params]);

    const getBusinessList=(category_)=>{
        setLoading(true);
        GlobalApi.GetBusiness(category_).then(resp=>{
            setBusinessList(resp?.restaurants)
            console.log(resp.restaurants);
            setLoading(false);
        })
    }

  return (
    <div className='mt-5'>
        <h3 className='font-bold text-xl'>Popular {category} Restaurants</h3>
        <h3 className='font-bold text-primary'>{businessList?.length} Results</h3>

        <div className='grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-7 mt-3
        '>
            {!loading? businessList.map((restaurants,index)=>(
                <BusinessItem key={index}
                business={restaurants}
                />
            )):
            [1,2,3,4,5,6,7,8].map((item,index)=>(
                <BusinessItemSkelton/>
            ))
            }
        </div>
    </div>
  )
}

export default BusinessList