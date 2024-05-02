import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import { Link, json } from 'react-router-dom';
import Allproducts from '../shop/Allproducts';
import axios from "axios"
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageProduct = () => {
    const[allProducts,setAllProducts]= useState([]);
    
    useEffect(()=>{
      axios.get("http://localhost:8070/product/").then((res)=>{
        setAllProducts(res.data)
      }).catch((err)=>{
        alert(err.message)
      })
    
  },[])
//delete a product
const handleDelete=(id) => {
  console.log(id);
    axios.delete(`http://localhost:8070/product/delete/${id}`)
        .then(response => {
            toast.info("Product is removed. Please refresh");
        })
        .catch(error => {
            console.error('Error deleting product:', error);
        });

}
  return (
    <div className='px-4 my-12'>
        <h2 className='mb-8 text-3xl font-bold'>Product Management. </h2>
        {/* table fpr product detailing */}
        <div className="overflow-x-auto">
      <Table className='lg:w-[1180px]'>
        <Table.Head>
        <Table.HeadCell>Number</Table.HeadCell>
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
            allProducts.map((product,index)=>
            <Table.Body className="divide-y" key={product._id}>
                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index+1}
            </Table.Cell>
            <Table.Cell>{product.productName}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell>{product.productCategory} </Table.Cell>
            <Table.Cell>{product.description}</Table.Cell>
            <Table.Cell>
              <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-4"
              to={`/admin/dashboard/edit/${product._id}`}>
                Edit
              </Link>
              <button onClick={()=>handleDelete(product._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-3xl hover:bg-sky-600'>Delete</button>
            </Table.Cell>
          </Table.Row>
            </Table.Body>)
        }

      </Table>
<ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"         
          />     
    </div>

    </div>
  )
}

export default ManageProduct