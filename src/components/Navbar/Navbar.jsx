

import React, { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import logo from '../../asstes/images/freshcart-logo.svg'
import { counterContext } from '../../Context/Counter'
import { TokenContext } from '../../Context/TokenContext'
import { Button } from 'bootstrap'
import { CartContext } from '../../Context/CartContext'
export default function Navbar() {

 let {counter}= useContext(counterContext);
 let {token,setToken}=useContext(TokenContext)
 let {numOfCartItems}=useContext(CartContext)
  let navigate=useNavigate()
 console.log(token);


 function logOut(){
    localStorage.removeItem("userToken")
    setToken(null)
    navigate('/login')
 }


  return<>
  

 <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" href="#">
    <img src={logo} alt="" />
   {counter}
    </Link>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button> */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item m-2">
          <Link clssName="nav-link" to={'home'}>Home</Link>
        </li>

        <li className="nav-item m-2">
          <Link clssName="nav-link" to={'cart'}>Cart</Link>
        </li>

        <li className="nav-item m-2">
          <Link clssName="nav-link" to={'products'}>Products</Link>
        </li>

        <li className="nav-item m-2">
          <Link clssName="nav-link" to={'brands'}>Brands</Link>
        </li>
        <li className="nav-item m-2">
          <Link clssName="nav-link" to={'categories'}>Categories</Link>
        </li>
      
       
      </ul>:null}



      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        

      <li className="nav-item m-2">
        <i className="fa-brands fa-instagram mx-1"></i>
        <i className="fa-brands fa-facebook mx-1"></i>
        <i className="fa-brands fa-twitter mx-1"></i>
        <i className="fa-brands fa-tiktok mx-1"></i>
        <i className="fa-brands fa-linkedin mx-"></i>
        </li>



       
      {token?<> <li className="nav-item m-2">
          <Link onClick={logOut} >Logout</Link>
        </li>
        <li className="nav-item m-2 ">
          <Link clssName="nav-link position-relative" to={'cart'}>Cart
          <i className='fa fa-shopping-cart text-main fs-4'></i>
          <span className='text-main rounded-3 position-absolute top-0 left-0 fs-5'>{numOfCartItems}</span>
          </Link>
        </li>
        </>:<> <li className="nav-item m-2">
          <Link clssName="nav-link" to={'register'}>Register</Link>
        </li>
      
        <li className="nav-item m-2">
          <Link clssName="nav-link" to={'login'}>Login</Link>
        </li></>}
       

      
       
       
      </ul>
    </div>
  </div>
</nav>

  
  
  
  </>
}
