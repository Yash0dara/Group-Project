import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';


const ProductCard = ({headline,product}) => {
  console.log(product);
    return (
        <div className='my-16 px-4 lg:px-24'>
            <h2 className='text-4xl text-center font-bold text-black my-5'>{headline}</h2>
         <div className='mt-12'>
                
            <Swiper
        slidesPerView={4}
       
        spaceBetween={10}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            product.map(product => <SwiperSlide key={product._id}>
                <Link to ={`/product/${product._id}`}>
                    <div>
                        <img src={product.imageUrl} alt=""/>
                    </div>
                    <div>
                        <h3>{product.productName}</h3> 
                    </div>
                    <div>
                        <h3>Rs {product.price}</h3> 
                    </div>
                    <div className=' bg-blue-200 hover:bg-black p-2 rounded'>
                        <h4 className='font-bold text-center hover:text-white'>Add to Cart
                        <FaCartShopping className='w-6 h-6 text-blue-500 absolute bottom-2 left-12'/>
                        </h4>
                       
                    </div>
                </Link>
            </SwiperSlide>)
        }
      </Swiper>

            </div>
        </div>
    
  )
}

export default ProductCard