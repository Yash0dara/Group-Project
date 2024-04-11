import React, { useEffect, useState } from "react";
import AllProductCard from "../components/AllProductCard";
import Banner from "../components/Banner";

const Allproducts = ({handleClick}) => {

    const [product,setProduct]=useState([]);
    
    useEffect(()=>{
        fetch("http://localhost:5000/all").then(res => res.json()).then(data=> setProduct(data));
    },[])
  return (
   <div>
    <Banner/> 
    <AllProductCard product={product}  headline="Let's Shop"  handleClick={handleClick} key={product._id} />
   </div>

  )
}

export default Allproducts