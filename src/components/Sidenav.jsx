import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineHome, AiOutlinePlaySquare } from "react-icons/ai";
import { IoMailUnreadOutline } from "react-icons/io5";
import ParticlesBackground from "../assets/animations/ParticlesBackground";
import LineAnimationV4 from "../assets/animations/LineAnimationV4";

const Sidenav = () => {
  const [nav, setNav] = useState(false);

  // Effect to disable/enable scroll when the sidenav is open/closed
  useEffect(() => {
    if (nav) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

  });

  // Function to close the sidenav when clicking inside it
  const handleSidebarClick = (e) => {
    // Prevent the close event when clicking on the actual links inside the sidenav
    e.stopPropagation();
    setNav(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-black">

      {/* Sidenav (Full screen width when opened) */}
      <div
        className={`fixed top-0 left-0 h-full bg-custom-orange-default z-50 p-10 flex flex-col justify-start items-start transition-transform duration-300 ${
          nav ? "translate-x-0 mix-blend-difference" : "-translate-x-full"
        } w-full`} // Full width on open (100% of the screen)
        onClick={handleSidebarClick} // Close sidenav when clicking anywhere inside it
      >
        {/* Close Button (Inside Sidenav) */}
        <AiOutlineClose
          size={30}
          className="absolute right-5 top-5 cursor-pointer text-white transition-all duration-300"
          onClick={() => setNav(false)}
          style={{ mixBlendMode: "difference" }}
        />

        {/* Sidebar Items */}
        <nav className="mt-16 flex flex-col space-y-6">
          <a 
            href="#home" 
            className="text-xl sm:text-2xl font-semibold flex items-center text-white hover:text-gray-300"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the link
          >
            <AiOutlineHome size={20} className="mr-3" />
            <span>Home</span>
          </a>
          <a 
            href="#projects" 
            className="text-xl sm:text-2xl font-semibold flex items-center text-white hover:text-gray-300"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the link
          >
            <AiOutlinePlaySquare size={20} className="mr-3" />
            <span>Projects</span>
          </a>
          <a 
            href="#contact" 
            className="text-xl sm:text-2xl font-semibold flex items-center text-white hover:text-gray-300"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the link
          >
            <IoMailUnreadOutline size={20} className="mr-3" />
            <span>Contact</span>
          </a>
        </nav>
      </div>

      {/* Menu Icon (Only shows when nav is closed) */}
      {!nav && (
        <AiOutlineMenu
          className="fixed left-5 top-5 z-[85] text-4xl cursor-pointer text-gray-800 transition-all duration-300"
          onClick={() => setNav(true)}
        />
      )}

      {/* Opacity Overlay */}
      {nav && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-30 z-30 transition-opacity duration-300"
          onClick={() => setNav(false)} // Close sidenav when clicking the overlay
        ></div>
      )}
    </div>
  );
};

export default Sidenav;
