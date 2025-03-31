import React from 'react';
import { Link } from 'react-scroll';  // Import from react-scroll for smooth scrolling

const ScrollButton = ({ targetSectionId, className }) => {
  return (
    <Link
      to={targetSectionId} // The id of the section to scroll to
      smooth={true} // Enable smooth scrolling
      duration={300} // Scroll duration
      className={`relative inset-0 flex justify-center items-center h-[120px] w-full bg-custom-orange-default text-gray-800 text-lg font-bold ${className} scroll-smooth`} // Full-size button
      >
      Scroll Down
    </Link>
  );
};

export default ScrollButton;
