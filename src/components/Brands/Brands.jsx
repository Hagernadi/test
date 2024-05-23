
// import React, { useContext } from 'react'
import styles from './Brands.module.css'

import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Brands() {

  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
   }

   let {isLoading,isError,data,refetch}= useQuery("products",getAllBrands)
   console.log(data?.data?.data)

  
  return <>
          <Helmet>
            <title>Brands Page</title>   
          </Helmet>
      <div className="container py-5">

      <h1 className='text-main text-center mb-5 brand'>All Brands</h1>


      {isLoading ? <BallTriangle
          height={100}
          width={100}
          radius={5}
          color='#4fa94d'
          ariaLabel='ball-triangle-loading'
          wrapperStyle=""
          wrapperClass={'justify-content-center'}
          visible={true}
          
          />:<div className="row g-4">
          {data?.data?.data?.map((brand)=><div className='col-md-3 img-hover'>
            <div className='img-category'>
              <img src={brand.image} className='w-100' alt="" />
              <h1 className='h3 text-main py-3 text-center'>{brand.name}</h1>
            </div>
          </div>)}
          </div>}










        </div>

      
        
      
    </>
      
}




 

