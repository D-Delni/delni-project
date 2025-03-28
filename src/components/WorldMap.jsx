import React from "react";
import tempWorldWhite from "../assets/images/tempWorld.svg"
import LineAnimationV6 from "../assets/animations/LineAnimationV6";

const WorldMapComponent = () => {
  return (
    <div id="WorldMap" className='relative top-0 left-0 w-full h-full z-0'>
    {/* Background Animation --> No funciona del todo (Es una linia que baja con el scroll)*/ 
    <LineAnimationV6 axis="vertical"/>}
      <div className="relative w-full h-screen flex justify-center items-center">
        <img src={tempWorldWhite} alt="World Map" className="w-auto h-auto object-cover" />
        
      </div>
    </div>
  );
};

export default WorldMapComponent;


