
import { useState } from "react";
import Navbar from "../components/Navbar";
import Allproducts from "./Allproducts";
import Cart from "./Cart";



const Shop = () =>{
  const [show,setShow] = useState(true);
    const [cart,setCart]=useState([]);
    const [warning,setWarning] = useState(false);

  

    const handleClick = (product) => {
      // console.log(product);
      let isPresent =false;
  
      cart.forEach((item)=>{
        if(product._id === item._id)
          isPresent=true;
      })
      if(isPresent){
        setWarning(true);
        setTimeout(()=>{
          setWarning(false);
        },2000);
        return; 
      }

        setCart ([...cart, product]);
      }

// const handleChange=(product,d)=>{
//   console.log(product,d);
// }

//cart quantity handling
const handleChange=(product,d)=>{
  let ind =-1;
  cart.forEach((data, index)=>{
     if(data._id ===product._id)
       ind =index;
  });
     const tempArr = cart;
     tempArr[ind].quantity += d;
     
     if (tempArr[ind].quantity === 0)
       tempArr[ind].quantity = 1;
     setCart([...tempArr])
 }
    return (
        <> 
         
        <Navbar size={cart.length} setShow={setShow}/>  
        {
             show ? <Allproducts handleClick={handleClick}/>: <Cart cart={cart} setCart={setCart} handleChange={handleChange}/>
        }
        {
          warning && <div role="alert" className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute top-full right-20 p-4 mb-4' >
            Iyem is already added to the cart
          </div>
          
        }
        </>
    )
}
export default Shop