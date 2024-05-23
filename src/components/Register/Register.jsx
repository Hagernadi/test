
import React, { useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Register() {
  let navigate=useNavigate()
  const [errorMessage,setErrorMessage]=useState("")
  const [isLoading,setIsLoading]=useState(false)

 async function callRegister(reqBody){
    console.log(reqBody);
    setErrorMessage("")
    setIsLoading(true)

    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,reqBody)
    .catch(err=>{
      setIsLoading(false)
      setErrorMessage(err.response.data.message)})
    
    console.log(data);
    if(data.message=="success"){
      navigate('/login')
     setIsLoading(false)
    }
  }






  const validationSchema=Yup.object({
    name:Yup.string().min(3,"Name is tooo short").max(10,"Name is to long").required("Name is required"),
    email:Yup.string().email("email is not valid").required("email s required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("email is required"),
    rePassword:Yup.string().oneOf([Yup.ref('password')],"password and rePassword should match").required("email is required"),
    phone:Yup.string().matches(/^01[01235][0-9]{8}/,"invalid phone").required("phone is required")

  })

    //useFormik
const registerForm= useFormik({
  initialValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:''
  },validationSchema:validationSchema
  ,onSubmit:callRegister
  
 })




 /* function validate(values){
  let errors={}
  if(!values.name){
    errors.name="Required"
  }else if(values.name.length <3){
    errors.name="name is shoort"
  }


  if(!values.email){
    errors.email="Required"
  }else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
    errors.email="invalid"
  }


  if(!values.password){
    errors.password="Required"
  }else if(!/^[A-z][a-z0-9]{3,5}$/.test(values.password)){
    errors.password="invalid"
  }


  if(!values.rePassword){
    errors.rePassword="Required"
  }else if(values.password != values.rePassword){
    errors.rePassword="password and repassword is nort match"
  }


  if(values.phone){
    errors.phone="Required"
  }else if(!/^01[01235][0-9]{8}$/.test (values.phone)){
    errors.phone="invalid"
  }



return errors;


 } */






  return <>
  
            <Helmet>
                
                <title>Home Page</title>
                
            </Helmet>


  <div className=" w-50 mx-auto py-4">
    <h2 className='mb-2'>Register Now : </h2>
 {errorMessage?<div className='alert alert-danger'>{errorMessage}</div>:''}
    <form onSubmit={registerForm.handleSubmit}>

    <div className="form-groupe">
      <label htmlFor="fullName">Full Name : </label>
      <input type="text" id='fullName' name='name' value={registerForm.values.name} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}  className='form-control my-2'/>
   {registerForm.errors.name&&registerForm.touched.name?<div className='alert alert-danger'>{registerForm.errors.name}</div>:''}
   
    </div>

    <div className="form-groupe">
      <label htmlFor="email">Email : </label>
      <input type="email" id='email' name='email' value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}  className='form-control my-2'/>
      {registerForm.errors.email&&registerForm.touched.email?<div className='alert alert-danger'>{registerForm.errors.email}</div>:''}
    
    </div>

    <div className="form-groupe">
      <label htmlFor="password">Password : </label>
      <input type="password" id='password' name='password'  value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}  className='form-control my-2'/>
      {registerForm.errors.password&&registerForm.touched.password?<div className='alert alert-danger'>{registerForm.errors.password}</div>:''}
    </div>
    <div className="form-groupe">
      <label htmlFor="repassword">rePassword: </label>
      <input type="password" id='repassword' name='rePassword'  value={registerForm.values.rePassword} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}  className='form-control my-2'/>
      {registerForm.errors.rePassword&&registerForm.touched.rePassword?<div className='alert alert-danger'>{registerForm.errors.rePassword}</div>:''}
    </div>
    <div className="form-groupe">
      <label htmlFor="phone">Phone: </label>
      <input type="tel" id='phone' name='phone' value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} className='form-control my-2'/>
    
      {registerForm.errors.phone&&registerForm.touched.phone?<div className='alert alert-danger'>{registerForm.errors.phone}</div>:''}
    </div>

    <button className='bg-main btn text-white d-block ms-auto' disabled={!(registerForm.isValid && registerForm.dirty)} >   
     {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Register"}</button>

    </form>
  </div>
   
  </>
}
