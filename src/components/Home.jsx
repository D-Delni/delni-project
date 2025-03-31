import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import ParticlesBackground from '../assets/animations/ParticlesBackground';
import LineAnimationV4 from '../assets/animations/LineAnimationV4';
import LineAnimationv2 from '../assets/animations/LineAnimationv2';

const Home = () => {
  return (
      <div id="home" className='absolute top-0 left-0 w-full h-full z-0'>
        {/* Background Animations */}
        <div className='absolute top-0 left-0 w-full h-full z-0 sm:w-[5%]'>
          <LineAnimationV4></LineAnimationV4>
        </div>
        <div className='absolute top-0 left-0 w-full h-full z-0 sm:w-[5%]'>
          <LineAnimationv2></LineAnimationv2>
        </div>
        
        
        
        <div className='w-full h-screen absolute top-0 left-0 bg-white/40' >
            <div className='max-w-[600] m-auto h-full w-full pl-20 flex flex-col justify-center items-start '>
              <h1 className=' sm:text-6xl text-4xl font-bold text-gray-800'> Dani D. Delgado </h1>
              <h3 className=' flex sm:text-4xl mt-[10%] text-gray-800'> 
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'I`m a Game Developer',
                  1500, // wait 1s before replacing "Mice" with "Hamsters"
                  'With too many hobbies',
                  1400,
                ]}
                wrapper="span"
                speed={20}
                style={{ fontSize: '1em', paddingLeft: '5px', display: 'inline-block' }}
                repeat={Infinity}
              />

              </h3>
              {/*Falta añadir los enlaces a las webs*/}
              <div className='flex  justify-between flex-row pt-6 max-w-[200px] w-full items-center'>
                <FaLinkedinIn size={20} className='cursor-pointer'/>
                <FaGithub size={20} className='cursor-pointer'/>
                <FaInstagram size={20} className='cursor-pointer' /></div>
              </div>
         </div>

      </div>
  )
}

export default Home;