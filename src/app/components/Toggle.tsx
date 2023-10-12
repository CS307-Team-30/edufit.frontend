import { useRouter } from 'next/router';
import React, { useState } from 'react';



const Toggle = () => {
  const [isToggled, setIsToggled] = useState(false);
  const router = useRouter()

  const handleToggle = () => {
    if (isToggled){
      setIsToggled(false)
      router.push('homepage')
    } else {
      setIsToggled(true)
      router.push('nutritionpage')
    }
  };


  return (
    <div 
      className={`relative inline-block w-12 max-h-[26px] rounded-xl align-middle select-none transition duration-200 ease-in ${isToggled ? 'bg-pink-500' : 'bg-pink-100'}`}
      onClick={() => handleToggle()}
      tabIndex={0}
    >
      <span 
        className={`block absolute text-pink-400 h-6 w-6 rounded-full bg-pink-300 shadow-md transform transition-transform duration-200 ease-in ${isToggled ? 'translate-x-6' : 'translate-x-0'}`}
      ></span>
    </div>
  );
};

export default Toggle;
