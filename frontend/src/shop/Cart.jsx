import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom';

const Cart = ({product,cart, setCart,handleChange}) => {
  const [price ,setPrice]=useState(0);
  
  const handlePrice=()=>{
    let ans =0;
    cart.map((product)=>{
      ans+= product.price * product.quantity
    })
    setPrice(ans);
  }

  const handleRemove=(id)=>{
    const arr= cart.filter((product)=> product._id !== id)
    setCart(arr);
  }

  useEffect(()=>{
    handlePrice();
  })

  return (
    
    <div className='px-4 my-12'>
    <h2 className='mb-8 text-3xl font-bold'>Product Management. </h2>
    {/* table fpr product detailing */}
    <div className="overflow-x-auto">
  <Table className='lg:w-[1180px]'>
    <Table.Head>

      <Table.HeadCell>Product name</Table.HeadCell>
      <Table.HeadCell>Price</Table.HeadCell>
      <Table.HeadCell>Category</Table.HeadCell>
      <Table.HeadCell>Description</Table.HeadCell>
      <Table.HeadCell>
        <span>
            Edit or Manage
        </span>
      </Table.HeadCell>
    </Table.Head>
        
    {
      cart?.map(product =>

<Table.Body className="divide-y" key={product._id}>
           <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>{product.productName}</Table.Cell>
            <Table.Cell> <img src={product.imageUrl} width="50" height="50" /></Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell>
            <div className="flex flex-row mt-2">
                <button  className="px-5 py-2 font-bold" onClick={()=>handleChange(product,+1)}>+</button>
                <span className="px-5 py-2 font-bold">{product.quantity}</span>
                <button className="px-5 py-2 font-bold"  onClick={()=>handleChange(product,-1)}>-</button>
            </div>
            </Table.Cell>
            <Table.Cell>
              <button className='bg-red-600 px-4 py-1 font-semibold text-white rounded-3xl hover:bg-sky-600'
              onClick={()=>handleRemove(product._id)}>Remove</button>
            </Table.Cell>
          </Table.Row>
    </Table.Body>

      )
    }    
    <Table.Body>
        <Table.Row>
            <Table.Cell>      
              <span className="font-bold text-sky-500 mr-5">Total price:</span>
              <span className="font-bold text-darkgreen text-2xl"> Rs {price}</span>
            </Table.Cell>

        </Table.Row>
    </Table.Body>
  </Table>
  <Link to="/choose_payment_method">
  <button className='mb-10 mt-10 mr-20 float-right bg-blue-500 text-white py-2 px-4 rounded'> Proceed To Payment</button>
  </Link>
  </div>
  </div>
 
  )
}

export default Cart