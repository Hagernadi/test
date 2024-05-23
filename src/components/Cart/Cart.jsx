
import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
export default function Cart() {

  const[cartDetails,setCartDetails]=useState({})

let {getCart,deleteProductFromCart,updateProductQuantities,setNumOfCartItems}= useContext(CartContext)

async function deleteItem(id){
let {data}= await deleteProductFromCart(id)
console.log(data);
setCartDetails(data)
setNumOfCartItems(data?.numOfCartItems)
}


async function updateCount(id,count){
  let {data}= await updateProductQuantities(id,count)
  console.log(data);
  data?.data?.products.map((ele)=>ele.count == 0?deleteItem(ele.product._id) :'')
    setCartDetails(data)
    
 
  }



async function getCartDetails(){
let {data}= await getCart()
console.log(data);
setCartDetails(data)
setNumOfCartItems(data?.data.numOfCartItems)
}



useEffect(()=>{
  getCartDetails()
},[])
  return <>
            <Helmet>  
                <title>Cart Page</title>  
            </Helmet>

            <div className="container my-5">
              <div className=" mx-auto bg-main-light p-5">
                <h1 className='mb-4'>Cart Shop</h1>
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className='h5'>Total Price : <span className='text-main'>{cartDetails?.data?.totalCartPrice}</span></h3>
                  <h3 className='h5'>Total Cart Items : <span className='text-main'>{cartDetails?.numOfCartItems}</span></h3>
                </div>

                {cartDetails?.data?.products.map((ele)=><div key={ele.product._id} className="row py-2 border-bottom">
                  <div className="col-md-1">
                    <img src={ele.product.imageCover} className='w-100' alt="" />
                  </div>

                  <div className="col-md-11">
                    <div className="d-flex justify-content-between">
                      <div className="left-side">
                        <h4>{ele.product.title}</h4>
                        <p>{ele.price} EGP</p>
                        <button onClick={()=>deleteItem(ele.product._id)} className='btn text-danger p-0'><i class="fa-solid fa-trash-can"></i> Remove</button>
                      </div>

                      <div className="right-side">
                        <button onClick={()=>updateCount(ele.product._id,ele.count+1)} className='main-btn'>+</button>
                        <span className=' px-1'> {ele.count} </span>
                        <button onClick={()=>updateCount(ele.product._id,ele.count-1)} className='main-btn'>-</button>
                      </div>
                    </div>

                  </div>
                  
                </div>)}
                <Link className='btn bg-main w-100 mt-5 text-white' to={'/CheckOut'}>CHECkOUT</Link>
              </div>
             
            
            </div>
    
  </>
}
