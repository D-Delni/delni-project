import React from "react";
import tempWorldWhite from "../assets/images/tempWorld.svg"

const WorldMapComponent = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <img src={tempWorldWhite} alt="World Map" className="w-full h-auto object-cover" />
    </div>
  );
};

export default WorldMapComponent;


