
import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useQuery } from 'react-query'
import {BallTriangle} from 'react-loader-spinner'

export default function Categories() {

  function getCategory(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {data,isLoading,isFetching}= useQuery('category',getCategory)
 
  console.log(data?.data.data);


  return (<>

            <Helmet>
                
                <title>Categories Page</title>
                
            </Helmet>
            
            {isLoading? <div className='w-100 py-5 d-flex justify-content-center'>
    <BallTriangle
          height={100}
          width={100}
          radius={5}
          color='#4fa94d'
          ariaLabel='ball-triangle-loading'
          wrapperStyle=""
          wrapperClass={{}}
          visible={true}
          
          />
    </div>:<div className="container py-5">
      <div className="row g-5">
        {data?.data.data.map((category)=> <div className="col-md-4 img-hover">
          <div className=' img-category'>
          <img className='w-100' height="400px" src={category.image} alt={category.name}/>
          <h1 className='h5 text-main p-4 text-center brand fs-2'>{category.name}</h1>
          </div>
        </div>)}
      </div>
    </div>}

  </>
   
  )
}






