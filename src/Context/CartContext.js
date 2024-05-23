import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContext=createContext();
let headers={
    token:localStorage.getItem("userToken")
}

function addToCart(id){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
    productId:id
   },{
    headers
   }).then((res)=>res).catch((err)=>err)
}


function getCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
   
    {
      headers
     }).then((res)=>res).catch((err)=>err)
  }

  function deleteProductFromCart(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      headers
     }).then((res)=>res).catch((err)=>err)
  }


 


  function updateProductQuantities(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,

    {
      count
    },
    {
      headers
     }).then((res)=>res).catch((err)=>err)
  }




export default function CartContextBrovider(props){

  const [cartId,setCartId]=useState(null);
  const [numOfCartItems,setNumOfCartItems ]=useState(null)


  async function getInitialCart(){
    let {data}= await getCart();
    setNumOfCartItems(data?.numOfCartItems);
   
    setCartId(data?.data?._id);
   
   }



  function onlinePayment(shippingAddress){
    //65f7466bbe8b523235678233
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
      shippingAddress,
  },
    {
      headers,
    })
  
  
  }



  


  useEffect(()=>{
    getInitialCart()
  },[])

    return <CartContext.Provider value={{addToCart,getCart,deleteProductFromCart,updateProductQuantities,onlinePayment,numOfCartItems,setNumOfCartItems}}>
        {props.children}
    </CartContext.Provider>
}