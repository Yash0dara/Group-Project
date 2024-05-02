import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


//icons
import { FaBarsStaggered, FaBlog, FaXmark ,FaCartShopping,FaUser } from "react-icons/fa6";
const Navbar = ({size,setShow}) => {
    //hooks
    const [isMenuOpen,setMenuOpen] = useState(false);
    const [isSticky,setSticky] = useState(false);


    //toggle menu
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }
    
    useEffect(() => {
        const handleScroll =() =>{
            if(window.scrollY > 100) {
                setSticky(true);
            }else{
                setSticky(false);
            }
        }
        window.addEventListener("scroll",handleScroll);

        return()=>{
            window.addEventListener("scroll",handleScroll);
        }

    },[])

//navItems
const navItems=[
    {link: "Home" , path:"/"},
    {link: "Bookings" , path:"/bookings"},
    {link: "Workouts" , path:"/workouts"},
    {link: "Shop" , path:"/shop" },
    {link: "Add Product" , path:"/admin/dashboard"},
    {link: "Salary" , path:"/salary_cal"},
    {link: "Recieved" , path:"/received"},
]

  return (
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-500'>
        <nav className={`py-4 lg:px-24 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300":""}`}>
            <div className='flex justify-between items-center text-base gap-0'>
                {/* logo  */}
                
                <span >
                     <Link to="/shop" className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaBlog
                className='inline-block' />Products</Link>
                </span>
               

                <ul className='md:flex space-x-12 hidden'>
                    {
                        navItems.map(({link,path})=>
                        <Link key={path} to={path} className='block text-base text-black uppercase
                        cursor-pointer hover:text-blue-700' onClick={()=>setShow(true)}> {link}
                        </Link> )
                                
                            
                    }
                </ul>
                    <div onClick={()=>setShow(false)}>
                         <Link to="" className='text-2xl  text-blue-500  '><FaCartShopping
                className='inline-block'/></Link>
                <span>
                    {size}
                </span>
                    </div>
               
                
                <Link to="/" className='text-2xl text-blue-500  items-end'><FaUser
                className='inline-block'/></Link>
                

               {/* btn for lg */}
               <div className='space-x-12 hidden lg:flex items-center'> 
               <button><FaBarsStaggered className='w-5 hover:text-blue-700'/></button>
               </div>
               {/* btn for mobbile */}

                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {
                                isMenuOpen ?<FaXmark className='h-5 w-5 text-black'/> :<FaBarsStaggered
                                className='h-5 w-5 text-black'/>
                            }
                        </button>
                    </div>
                 </div>
                 {/* small devices */}
                 <div className={`space-y-4 px-4 mt-12 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0"  : "hidden"}`}>
                    {
                         navItems.map(({link,path})=>
                         <Link key={path} to={path} className='block text-base text-white uppercase
                         cursor-pointer'> {link}</Link> )
                    }
                  
                 </div>
        </nav>
    </header>
  )
}

export default Navbar