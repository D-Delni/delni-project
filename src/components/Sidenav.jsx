import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose, AiOutlinePlaySquare} from 'react-icons/ai';
import { IoMailUnreadOutline } from "react-icons/io5";

const Sidenav = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Disable scrolling when sidenav is open
  if (nav) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  return (
    <div>
      {/* Menu Icon */}
      {!nav && <AiOutlineMenu
        className={`fixed left-5 top-5 z-[85] text-4xl cursor-pointer transition-all duration-300 ${
          nav ? "text-gray-700" : "text-gray-800"
        }`}
        onClick={handleNav}
      />}

      {/* Opacity */}
      {nav && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-30 z-30 transition-opacity duration-300"
          onClick={handleNav} // Clicking on the background closes the sidenav
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`top-0 ml-0 w-[26vw] bg-custom-orange-default p-10 pl-5 text-white  overflow-auto fixed h-full z-40 ease-in-out duration-300 ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AiOutlineClose size={45}
        className={`fixed right-5 top-5 z-[85] text-4xl cursor-pointer transition-all duration-300 ${
          nav ? "text-gray-700" : "text-transparent"
        }`}
        onClick={handleNav}
      />

      {/* Sidebar Items*/}
        <a href='#main' className=' mt-10 w-full text-2xl font-semibold text-gray-800 flex items-center cursor-pointer hover:text-custom-orange-light-dark'>
          <AiOutlineHome size={25} className='mr-3' />
          <span className='p-2 rounded-md'>Home</span>
        </a>

        <a href='#projects' className='w-full text-2xl font-semibold text-gray-800 flex items-center cursor-pointer hover:text-custom-orange-light-dark'>
          <AiOutlinePlaySquare size={25} className='mr-3' />
          <span className='p-2 rounded-md items-center'>Projects</span>
        </a>

        <a href='#contact' className='w-full text-2xl font-semibold text-gray-800 flex items-center cursor-pointer hover:text-custom-orange-light-dark'>
          <IoMailUnreadOutline   size={25} className='mr-3' />
          <span className='p-2 rounded-md items-center'>Contact</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidenav;
