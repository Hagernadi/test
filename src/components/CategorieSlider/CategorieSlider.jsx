
import React, { useEffect, useState } from 'react'
import styles from './CategorieSlider.module.css'
import axios from 'axios'
import Slider from 'react-slick';
export default function CategorieSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };


  const[categories,setCategories]=useState([])


  useEffect(()=>{
    getCategories()
  },[])

   async function getCategories(){
     let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
     console.log(data);
     setCategories(data.data)
    }

  return <>

 
  <div className="container my-5">
  <h2 className='my-4'>Shoo Populer Categories</h2>
  <Slider {... settings}>

    {categories.map(cat=> <div className="item px-1">
      <img src={cat.image} height={200} className='w-100' alt="" />
      <h5>{cat.name}</h5>
    </div>)}
  </Slider>
   
  </div>
  
  </>
}
