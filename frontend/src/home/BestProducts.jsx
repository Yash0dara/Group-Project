import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';

const BestProducts = () => {
    const [product, setProduct]=useState([]);

    useEffect( () => {
        fetch("http://localhost:5000/all").then(res => res.json()).then(data => setProduct(data.slice(0,5)))
    },[])
  return(
    <div>
       <ProductCard product={product} headline="Let's Shop"/>
    </div>
  )
}

export default BestProducts