import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';

const BestProducts = ({handleClick}) => {
    const [product, setProduct]=useState([]);
  

    useEffect( () => {
        fetch("http://localhost:5000/all").then(res => res.json()).then(data => setProduct(data.slice(0,5)))
    },[])
  return(
    <div>
       <ProductCard product={product} headline="Let's Shop" handleClick={handleClick} key={product._id}/>
    </div>
  )
}

export default BestProducts