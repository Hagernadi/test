
import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import * as Yup from'yup'
import axios from 'axios';
import { useFormik } from 'formik';
import { TokenContext } from '../../Context/TokenContext';
import { Helmet } from 'react-helmet';
export default function Login() {
    let navigate=useNavigate()
    const [errorMessage,setErrorMessage]=useState("")
    const [isLoading,setIsLoading]=useState(false)
    let {setToken}=useContext(TokenContext)


   async function callLogin(reqBody){
      console.log(reqBody);
      setErrorMessage("")
      setIsLoading(true)
  
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,reqBody)
      .catch(err=>{
        setIsLoading(false)
        setErrorMessage(err.response.data.message)}
       
      )
      console.log(data);
      if(data.message=="success"){

        localStorage.setItem("userToken",data.token)
        setToken(data.token)
        
        navigate('/home')
        setIsLoading(false)
      }
    }


    const validationSchema=Yup.object({
     
      email:Yup.string().email("email is not valid").required("email is required"),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("email is required"),
    
    })


    const loginForm= useFormik({
      initialValues:{
      
        email:'',
        password:'',
     
      },validationSchema:validationSchema
      ,onSubmit:callLogin
      
     })



  return <>
          <Helmet>
                
                <title>Login Page</title>
                
            </Helmet>
  <div className=" w-50 mx-auto py-4">
    <h2 className='mb-2'>Login Now : </h2>
    {errorMessage?<div className='alert alert-danger'>{errorMessage}</div>:''}
    <form onSubmit={loginForm.handleSubmit}>

   
    <div className="form-groupe">
      <label htmlFor="email">Email : </label>
      <input type="email" id='email' name='email' value={loginForm.values.email} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur}  className='form-control my-2'/>
      {loginForm.errors.email&&loginForm.touched.email?<div className='alert alert-danger'>{loginForm.errors.email}</div>:''}
    
    </div>

    <div className="form-groupe">
      <label htmlFor="password">Password : </label>
      <input type="password" id='password' name='password'  value={loginForm.values.password} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur}  className='form-control my-2'/>
      {loginForm.errors.password&&loginForm.touched.password?<div className='alert alert-danger'>{loginForm.errors.password}</div>:''}
    </div>
   
 

    <button className='bg-main btn d-block ms-auto text-white'>{isLoading?<i className='fa fa-spinner fa-spin'></i>:"Login"}</button>

    </form>
  </div>
  
  
  
  </>
}