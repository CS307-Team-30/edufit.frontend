import {motion} from 'framer-motion'

export default function PostBox() {
 const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <motion.div>

      <form 
        onSubmit={handleSubmit}
        className="min-h-[300px] w-[800px] text-pink-500 fixed bottom-0 right-1/4 bg-pink-50 shadow-lg z-30 rounded-lg px-4 py-4"
      >
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
