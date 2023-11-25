import axios from 'axios';
import { useEffect, useState } from 'react';
import { PiMaskSad } from "react-icons/pi";

import '../src/styles/colors.css';
import '../src/styles/globals.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
import ComponentsLayout from '@/app/components/layout';
import PostBox from '@/app/components/PostBox';
import PostComponent from '@/app/components/PostComponent';
import Sidebar from '@/app/components/Sidebar';
import { useGlobalStore } from '@/app/stores/UserStore';

import { Community } from '@/types/Community';
import { initialUserState } from '@/types/User';

type HomePageProps = {
  communities: Array<Community>;
};

export default function Homepage({ communities }: HomePageProps) {
  const [user, setUser] = useState(initialUserState);

  const glUser = useGlobalStore((state) => state.user);

  const updateCommunities = useGlobalStore((state) => state.update);
  const gposts = useGlobalStore((state) => state.homepagePosts);
  const [posts, setPosts] = useState(gposts)

  const [sortMethod, setSortMethod] = useState('default'); // 'default', 'mostUpvoted', 'mostDownvoted'


  useEffect(() => {
    setUser(glUser);
    setPosts(gposts)
  }, [glUser, gposts]);

  updateCommunities(communities);

  const handleSortChange = (method: string) => {
    setSortMethod(method);
  };


  const sortedPosts = [...posts].sort((a, b) => {
    if (sortMethod === 'mostUpvoted') {
      return (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length);
    } else if (sortMethod === 'mostDownvoted') {
      return (b.downvotes.length - b.upvotes.length) - (a.downvotes.length - a.upvotes.length);
    }
    // Default sorting (or any other custom sorting logic)
    return a.id - b.id; // Example: sorting by post ID
  });


  if (user.exp != -1) {
    return (
      <ComponentsLayout>
        <div className=' flex flex-row justify-between'>
          <Sidebar />
          <div
            id='threads'
            className='relative mb-24 ml-8 mr-32 w-full flex-col justify-center bg-pink-300'
          >
            <div className='mx-24 my-12 space-x-4 text-pink-600'>
              <button className='bg-white hover:scale-105 rounded py-1 px-2 font-bold' onClick={() => handleSortChange('default')}>Default</button>
              <button className='bg-white hover:scale-105 rounded py-1 px-2 font-bold' onClick={() => handleSortChange('mostUpvoted')}>Most Upvoted</button>
              <button className='bg-white hover:scale-105 rounded py-1 px-2 font-bold' onClick={() => handleSortChange('mostDownvoted')}>Most Downvoted</button>
            </div>

            {sortedPosts.length === 0 ? (
              <h1 className='text-center pt-12 text-pink-700 font-bold flex flex-row items-center justify-center '>No posts <PiMaskSad className='text-5xl ml-3' /></h1>
            ) : (
              sortedPosts.map((item, index) => (
                <div key={index}>
                  <PostComponent
                    id={item.id}
                    author={item.author.username}
                    title={item.title}
                    community={item.community}
                    content={item.content}
                    upvotes={item.upvotes}
                    downvotes={item.downvotes}
                  />
                </div>
              ))
            )}
          </div>
          <PostBox />
        </div>
      </ComponentsLayout>
    );
  } else {
    return <div className='h-full w-full text-black'>Loading...</div>;
  }
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const resData = await axios.get('http://127.0.0.1:8000/all-communities');
  const communities: Array<Community> = resData.data;
  return {
    props: {
      communities
    }
  };
}
