
import React from 'react'

import MainSlider from '../MainSlider/MainSlider'
import CategorieSlider from '../CategorieSlider/CategorieSlider'
import { Helmet } from 'react-helmet'
import Products from '../Products/Products'


export default function Home() {
  return <>
            <Helmet>
                
                <title>Home Page</title>
                
            </Helmet>
  <MainSlider/>
 <CategorieSlider />
  <Products />
  </>
}
