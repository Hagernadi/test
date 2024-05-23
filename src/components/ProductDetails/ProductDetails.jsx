
import React, { useContext } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {

  let {addToCart,setNumOfCartItems}=useContext(CartContext)


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay:true,
    // autoplaySpeed:1500
  };




 let params= useParams()
 console.log(params);


 function getProductDetails(id){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 }



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






 let {data,isLoading}=useQuery("detailsProduct",()=>getProductDetails(params.id))
//  console.log(data);
 let details=data?.data?.data;
 console.log(details);
  return <>
  
  <div className="container py-5">
    {isLoading? <BallTriangle
          height={100}
          width={100}
          radius={5}
          color='#4fa94d'
          ariaLabel='ball-triangle-loading'
          wrapperStyle=""
          wrapperClass={'justify-content-center'}
          visible={true}
          
          />:  <div className="row">
          <div className="col-md-4">
         

          <Slider {...settings}>
            {details.images.map((ele,index)=><img key={index} src={ele} alt=''/>)}
          </Slider>
           
          </div>
    
          <div className="col-md-8">
            <h2>{details.title}</h2>
            <p>{details.description}</p>
            <p>{details.category.name}</p>
            <div className='d-flex justify-content-between'>
              <h5>{details.price} EGP</h5>
              <p><i className='fa fa-star rating-color'></i>454</p>
    
            </div>
    
            <button onClick={()=>addCart(details.id)} className='btn bg-main text-white w-100'>Add to cart</button>
          </div>
        </div>}
  
  </div>
  
  </>
}
