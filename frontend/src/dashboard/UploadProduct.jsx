import { Label, Select, Textarea } from 'flowbite-react'
import React, { useState } from 'react'


import { Button, Checkbox, TextInput } from 'flowbite-react';


const UploadProduct = () => {

const productCategories=[
  "Clothing",
  "Protein",
  "Gym-Equipment"
]
const [SelectedCategories, setCategories]= useState(productCategories[0]);

const  handleCategories = (event) => {
  console.log(event.target.value);
  setCategories(event.target.value);
}


// handle submissions
const handleSubmit = (event) =>{
  event.preventDefault();
  const form = event.target;

  const productName = form.productName.value;
  const imageUrl = form.imageUrl.value;
  const price = form.price.value;
  const quantity = form.quantity.value;
  const description = form.description.value;
  const productCategory = form.productCategory.value;

const productObj ={
  productName,
  imageUrl,
  price,
  quantity,
  description,
  productCategory
}
  console.log(productObj);


//send to mongoDB
fetch("http://localhost:5000/add",{
  method:"POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(productObj)
}).then(res => res.json()).then(data => {
  //console.log(data);
  alert("Product uploaded succesfullt!")
  form.reset();
})

} 
return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload Product</h2>

      <form onSubmit={handleSubmit} className="flex lg:w-[1180px] flex-col gap-4">
        
        {/* FIRST ROW    name and category*/} 
        
        <div className='flex gap-8'>

          {/* Product name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
                <Label
                  htmlFor="productName" 
                  value="Product Name:" 
                />
            </div>
                  <TextInput 
                  id="productName" 
                  name='productName'
                  type="text"
                  placeholder="Product Name" 
                  required 
              />
          </div>
          {/* imageUrl */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
                <Label
                  htmlFor="imageUrl" 
                  value="imageUrl" 
                />
            </div>
                  <TextInput 
                  id="imageUrl" 
                  name='imageUrl'
                  type="text"
                  placeholder="URL" 
                  required 
              />
          </div>
        </div>  

        {/* SECOND ROW    price and quantity*/}
       <div className='flex gap-8'>
                 
           {/* Product Price */}
              <div className='lg:w-1/2'>
                <div className="mb-2 block">
                    <Label
                      htmlFor="price" 
                      value="price :" 
                    />
                </div>
                      <TextInput 
                      id="price" 
                      name='price'
                      type="text"
                      placeholder="1000.00 " 
                      required 
                  />
              </div>

              {/* quantity */}
              <div className='lg:w-1/2'>
                <div className="mb-2 block">
                    <Label
                      htmlFor="quantity" 
                      value="quantity :" 
                    />
                </div>
                      <TextInput 
                      id="quantity" 
                      name='quantity'
                      type="text"
                      placeholder="100" 
                      required 
                  />
              </div>
       </div> 
        {/* THIRD ROW    description and category*/}
        <div className='flex gap-8'>

          {/* Product description */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
                <Label
                  htmlFor="description" 
                  value="Product description:" 
                />
            </div>
                  <Textarea 
                  id="description" 
                  name='description'
                  type="text"
                  placeholder="Leave a description..." 
                  required rows={4}
              />

          </div>
          {/* Category */}
          <div className='lg:w-1/2'>
          <div className="mb-2 block">
                <Label
                  htmlFor="inputState" 
                  value="Product category:" 
                />
            </div>
              <Select id='inputState' name='productCategory' className='w-full rounded' value={SelectedCategories}
              onChange={handleCategories}>
                  {/* giving the options */}
                  {
                    productCategories.map((option)=> <option key={option} value={option}> {option} </option>)
                  }
              </Select>

              
          </div>


        </div>    
          
   



      <Button type="submit">Submit</Button>
    </form>
    
    </div>
  )
}

export default UploadProduct