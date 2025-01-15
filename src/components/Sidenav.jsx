import React, { useState } from 'react'
import {AiOutlineHome, 
        AiOutlineMenu, 
        AiOutlineProject, 
        AiOutlineMail, 
    }  from 'react-icons/ai'

import {GrProjects} from 'react-icons/gr'
import {BsPerson} from 'react-icons/bs'
import { GiRoad } from "react-icons/gi";


const Sidenav = () => {
    const [nav,setNav] = useState(false);
    const handleNav  = () => {
        setNav(!nav);
        console.log("status changed")
    };


    return (
        <div>
            <AiOutlineMenu onClick={handleNav} size={15} className='absolute top-5  right-5 z-[99] md:hidden'/>
            {nav ? (
                <div className="fixed top-0 left-0 w-full h-screen bg-opacity-40 bg-gray-600 flex flex-col justify-around items-center z-20">
                    <a  href='#main' 
                        className='w-[75%] flex justify-center items-center rounded-full  bg-gray-600 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200 '>
                        <AiOutlineHome size={15}/>
                        <span className='pl-4'>Home</span>
                    </a>
                    <a  href='#projects' 
                        className='w-[75%] flex justify-center items-center rounded-full shadow-lg  bg-gray-600  m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200 '>
                        <GrProjects size={15}/>
                        <span className='pl-4'>Projects</span>
                    </a>
                    <a  href='#Resume' 
                        className='w-[75%] flex justify-center items-center rounded-full shadow-lg  bg-gray-600  m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200 '>
                        <BsPerson size={15}/>
                        <span className='pl-4'>Resume</span>
                    </a>
                    <a  href='#My Way' 
                        className='w-[75%] flex justify-center items-center rounded-full shadow-lg  bg-gray-600 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200 '>
                        <GiRoad size={15}/>
                        <span className='pl-4'>My way</span>
                    </a>
                </div>
                ) : (
                    <div>

                    </div>
                )}
                <div className='md:block hidden fixed top-[33%] z-10'>
                    <div className='flex flex-col'>
                        <a href="#main" className='rounded-full shadow-lg bg-opacity-40 bg-gray-600 m-2 p-4 cursor-pionter hover:scale-110 ease-in duration-300'>
                            <AiOutlineHome size={25}/>
                        </a>
                    </div>
                    <div className='flex flex-col'>
                        <a href="#projects" className='rounded-full shadow-lg bg-opacity-40 bg-gray-600 m-2 p-4 cursor-pionter hover:scale-110 ease-in duration-300'>
                            <GrProjects size={25}/>
                        </a>
                    </div>
                    <div className='flex flex-col'>
                        <a href="#Resume" className='rounded-full shadow-lg bg-opacity-40 bg-gray-600  m-2 p-4 cursor-pionter hover:scale-110 ease-in duration-300'>
                            <BsPerson size={25}/>
                        </a>
                    </div>
                    <div className='flex flex-col'>
                        <a href="#My Way" className='rounded-full shadow-lg bg-opacity-40 bg-gray-600  m-2 p-4 cursor-pionter hover:scale-110 ease-in duration-300'>
                            <GiRoad size={25}/>
                        </a>
                    </div>
                </div>
        </div>
    );
};

export default Sidenav;