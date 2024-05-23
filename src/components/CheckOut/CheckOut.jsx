
import React, { useContext } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
export default function CheckOut() {

  let {onlinePayment}=useContext(CartContext)

async function Payment(values){
  console.log('Payment',values);
 let {data}=await onlinePayment(values)
 console.log(data);
 window.location.href=data.session.url
}
  let formik=useFormik({
    initialValues:{
      "details": "",
      "phone": "",
      "city": ""
    },onSubmit:Payment
  })
  return <>

  <div className="container">
    <div className="mx-auto bg-main-light p-5">
      <h2 className='mb-4'>Shipping Address</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="details" className='mb-1'>Details :</label>
          <input type="text" className='form-control' id='details' name='details' value={formik.values.details} onChange={formik.handleChange}/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone" className='mb-1'>Phone :</label>
          <input type="text" className='form-control' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange}/>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="city" className='mb-1'>City :</label>
          <input type="text" className='form-control' id='city' name='city' value={formik.values.city} onChange={formik.handleChange}/>
        </div>


      <button className='btn bg-main w-100 text-white'>Pay Now :D</button>
        
      </form>
    </div>
  </div>
  
  
  </>
}
