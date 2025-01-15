import React, { useState } from 'react'
import { AiOutlineHome, AiOutlineMenu, AiOutlineProject, AiOutlineMail } from 'react-icons/ai'
import { GrProjects } from 'react-icons/gr'
import { BsPerson } from 'react-icons/bs'
import { GiRoad } from "react-icons/gi"

const Sidenav = () => {
  const [nav, setNav] = useState(false)
  const handleNav = () => {
    setNav(!nav)
    console.log("status changed")
  }

  return (
    <div>
      {/* Sticky menu button (only visible on mobile) */}
      <AiOutlineMenu 
        onClick={handleNav} 
        size={25} 
        className='fixed top-5 right-5 z-[99] md:hidden cursor-pointer' 
      />
      
      {/* Side navigation menu - opens from the right on small screens */}
      {nav ? (
        <div className="fixed top-0 right-0 w-64 h-full bg-opacity-80 bg-gray-600 flex flex-col justify-start items-center z-20 md:hidden">
          <a href='#main' className='w-full flex justify-center items-center rounded-full bg-gray-600 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
            <AiOutlineHome size={15} />
            <span className='pl-4'>Home</span>
          </a>
          <a href='#projects' className='w-full flex justify-center items-center rounded-full shadow-lg bg-gray-600 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
            <GrProjects size={15} />
            <span className='pl-4'>Projects</span>
          </a>
          <a href='#resume' className='w-full flex justify-center items-center rounded-full shadow-lg bg-gray-600 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
            <BsPerson size={15} />
            <span className='pl-4'>Resume</span>
          </a>
          <a href='#my-Way' className='w-full flex justify-center items-center rounded-full shadow-lg bg-gray-600 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'>
            <GiRoad size={15} />
            <span className='pl-4'>My Way</span>
          </a>
        </div>
      ) : null}

      {/* Desktop navigation (visible on medium screens and above) */}
      <div className='hidden md:block fixed top-[33%] z-10'>
        <div className='flex flex-col'>
          <a href="#main" className='rounded-full shadow-lg bg-opacity-40 bg-gray-600 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
            <AiOutlineHome size={25} />
          </a>
        </div>
        <div className='flex flex-col'>
          <a href="#projects" className='rounded-full shadow-lg bg-opacity-40 bg-gray-600 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
            <GrProjects size={25} />
          </a>
        </div>
        <div className='flex flex-col'>
          <a href="#resume" className='rounded-full shadow-lg bg-opacity-40 bg-gray-600 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
            <BsPerson size={25} />
          </a>
        </div>
        <div className='flex flex-col'>
          <a href="#my-Way" className='rounded-full shadow-lg bg-opacity-40 bg-gray-600 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300'>
            <GiRoad size={25} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidenav;