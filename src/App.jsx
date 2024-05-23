import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound/NotFound'
import  { TokenContext } from './Context/TokenContext';
import { useContext, useEffect } from 'react';
import ProtectedRoutes from './components/ProtectedRoute/ProtectedRoutes';
import ProtectedRouteLogin from './components/ProtectedRouteLogin/ProtectedRouteLogin';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
function App() { 

let {setToken}=useContext(TokenContext)


 let routes= createBrowserRouter([
    {path:"",element:<Layout/>,children:[
      {path:"home",element:<ProtectedRoutes><Home/></ProtectedRoutes>},
      {path:"categories",element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
      {path:"cart",element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:"products",element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:"brands",element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
      {path:"productDetails/:id",element:<ProtectedRoutes><ProductDetails /></ProtectedRoutes>},
      {path:"checkout",element:<CheckOut />},
      {path:"allorders",element:<AllOrders />},
      {path:"login",element:<Login/>},
      {path:"register",element:<Register/>},
      {path:"*",element:<NotFound/>}
    ]}
  ])


  useEffect(()=>{
    if(localStorage.getItem != null){
      setToken(localStorage.getItem("userToken"))
    }

  },[])


  return <>
 
      <RouterProvider router={routes}></RouterProvider>
 
  
  
  
  </>
}

export default App;
