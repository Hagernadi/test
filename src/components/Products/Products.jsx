
import React, { useContext, useEffect, useState } from 'react'
import styles from './Products.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import {BallTriangle} from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import ProductDetails from '../ProductDetails/ProductDetails'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function Products() {

let {addToCart,setNumOfCartItems}=useContext(CartContext)

  function getAllProducts(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
 let {isLoading,isError,data,refetch}= useQuery("products",getAllProducts)
// console.log(data?.data?.data);
let products=data?.data?.data;
console.log(products);

async function addCart(id){
 let {data}=await addToCart(id)
console.log(data);
if(data.status=="success"){
  toast('Product added successfully',{
    position: 'top-right',
    style: {
      border:'1px solid #0aad0a',
      color:'#0aad0a'
    },
  })
  setNumOfCartItems(data?.numOfCartItems)

}else{

  toast.error('Product added not successfully')
}
}

  return (<>
          <Helmet>    
                <title>Products Page</title>    
            </Helmet>

           <div className="container my-5">

          {isLoading ? <BallTriangle
          height={100}
          width={100}
          radius={5}
          color='#4fa94d'
          ariaLabel='ball-triangle-loading'
          wrapperStyle=""
          wrapperClass={'justify-content-center'}
          visible={true}
          
          />: <div className="row">
          {products.map((product)=> <div key={product.id} className="col-md-2">
            <div className="product px-2 py-3">

            <Link to={'/ProductDetails/'+product.id}>

              <img src={product.imageCover} className='w-100' alt={product.title} />
              <p className='text-main text-center'>{product.category.name}</p>
              <h3 className='h5' title={product.title}>{product.title.split(" ").slice(0,2).join(" ")}</h3>
              <div className='d-flex justify-content-between'>
                <p>{product.price} EGP</p>
                <p><i className='fa fa-star rating-color'></i>{product.ratingsAverage}</p>
                
              </div>
            
            </Link>



            <button onClick={()=>addCart(product.id)} className='btn bg-main text-white w-100'>Add to cart</button>
            </div>
          </div>)}
         
        </div>} 
        </div>


  </>
    
  )
}
