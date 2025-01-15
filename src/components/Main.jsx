import React from 'react'
import background from '/src/assets/images/background.png';
import { TypeAnimation } from 'react-type-animation';
import { FaTwitter, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import LineAnimationV4 from '../assets/animations/LineAnimationV4';


const Main = () => {
  return (
    <div id='main'>
      {/* <img className="w-full h-screen object-cover object-left flip-left scale-x-[1]" 
      src={background}

      alt="/" />  */}

      <LineAnimationV4 className="absolute object-cover top-0 left-0 w-full h-full z-[-1]"/>
      
  
      <div className='w-full h-screen absolute top-0 left-0 bg-white/40' >
          <div className='max-w-[700] m-auto h-full w-full flex flex-col justify-center items-center '>
            <h1 className=' sm:text-5xl text-4xl font-bold text-gray-800'>I'm Delni</h1>
            <h3 className=' flex sm: text-2xl pt-4 text-gray-800'> 
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Are we in the same narrative?',
                1500, // wait 1s before replacing "Mice" with "Hamsters"
                'Do you want to be part of it?',
                1400,
              ]}
              wrapper="span"
              speed={20}
              style={{ fontSize: '1em', paddingLeft: '5px', display: 'inline-block' }}
              repeat={Infinity}
            />

            </h3>
            <div className='flex justify-between pt-6 max-w-[200px] w-full'>
              <FaLinkedinIn size={20} className='cursor-pointer'/>
              <FaGithub size={20} className='cursor-pointer'/>
              <FaInstagram size={20} className='cursor-pointer' /></div>
          </div>
        </div>
      </div>
  )
}

export default Main;