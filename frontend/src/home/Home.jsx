import React, { useState } from 'react'

import BestProducts from './BestProducts'
import HomeBanner from '../components/HomeBanner'
import Navbar from '../components/Navbar';

const Home = () => {

  const [show,setShow]=useState(true);
  const [cart,setCart]=useState([]);
  const handleClick = (product) => {
    // console.log(product);
    let isPresent =false;

    cart.forEach((item)=>{
      if(product._id === item._id)
        isPresent=true;
    })
    if(isPresent)
        return;
      setCart ([...cart, product]);
    }  
      return (
        <div>
        <Navbar size={cart.length}/>
        <HomeBanner/> 
        <BestProducts handleClick={handleClick}/> 
        </div>
      )
}

export default Home