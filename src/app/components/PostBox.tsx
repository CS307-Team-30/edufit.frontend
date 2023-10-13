import {motion} from 'framer-motion'
import { useState } from 'react';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';

export default function PostBox() {
 const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };


  const [toggle, setToggle] = useState(true)

  return (
    <motion.div
      className='fixed bottom-0 right-1/4'
      initial={{y:0}}
      animate={toggle ? {y:250} : {y:0}}
    >
      <form 
        onSubmit={handleSubmit}
        className="min-h-[300px] w-[800px] text-pink-500  bg-pink-50 shadow-lg z-30 rounded-lg px-4 py-4"
      >
        <motion.button
          initial={{rotate: 0, originX: 0, originY: 0}}
          animate={toggle ? {rotate: 180} : {rotate:0}} 
          onClick={() => setToggle(!toggle)} 
          className='text-pink-500 left-1/2'>
         <BsFillArrowDownCircleFill />
        </motion.button>
        <h3>Post title</h3>
        <input 
          type="text" 
          name="postTitle" 
          placeholder="Enter post title" 
          className="w-full p-2 mb-2 rounded border border-pink-300"
        />
        
        <h3>Post description</h3>
        <textarea 
          name="postDescription" 
          placeholder="Enter post description" 
          className="w-full p-2 mb-2 rounded border border-pink-300"
        ></textarea>
        
        <button 
          type="submit" 
          className="mt-2 bg-pink-500 text-white p-2 rounded"
        >
          Submit Post
        </button>
      </form>
    </motion.div>
  );
}
