import React from 'react'
import Card from '../home/Card'

const HomeBanner = () => {
    return (
        <div className='px-4 lg:px-24 bg-teal-100 flex items-center '>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
          {/* left side */}
            <div className='md:w-1/2 space-y-8 h-full'>
              <h2 className='text-5xl font-bold leading-snug text-black'>Welcome to the official site of<span className='text-blue-700'> K-One Fitness Center</span></h2>
              <p className='md:w-4/5'>blah blah blah blah blah blah blah blah blah blah
               blah blah blah blah   blah blah blah blah blah blah blah blah blah blah blah 
               blah blah blah  blah blah blah blah blah blah blah blah blah blah blah blah blah blah</p>
            
          
             
            </div>
            {/* right side */}
            <div>
                <Card/>
            </div>
    
        </div> 
      </div>
      )
}

export default HomeBanner