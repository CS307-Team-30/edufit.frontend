import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GiTumbleweed } from "react-icons/gi";
import { PiMaskSad } from "react-icons/pi";

import '../../src/styles/colors.css';
import '../../src/styles/globals.css';

import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';

import ComponentsLayout from '@/app/components/layout';
import PostComponent from '@/app/components/PostComponent';
import Sidebar from '@/app/components/Sidebar';
import { useGlobalStore } from '@/app/stores/UserStore';

import { Community } from '@/types/Community';
import { Instructor } from '@/types/Instructor';
import { Post } from '@/types/Post';

type CommunityPageProps = {
  data: {
    post_list: Array<Post>;
    description: string;
    instructors: Array<Instructor>;
    prerequisites: Array<Community>;
  }
};

export default function DynamicCommunityPage({ data }: CommunityPageProps) {
  const router = useRouter();

  // This will give you the current path
  const currentPath = router.asPath;

  // If you want to get the last segment of the current path
  const pathSegments = currentPath.split('/').filter(Boolean);
  const communityId = pathSegments[pathSegments.length - 1];

  const [dataState, setDataState] = useState(false);

  const [subbed, setSubbed] = useState(false);

  const userId = useGlobalStore((state) => state.user.id);

  const subbedCommunities = useGlobalStore((state) => state.user.communities);
  const [posts, setPosts] = useState<Array<Post>>([])
  const [description, setDescription] = useState('')
  const setInstructorModal = useGlobalStore(state => state.updateInstructor) 


  useEffect(() => {
    if (data != undefined) {
      setDataState(true);
      console.log(data.instructors)
      setPosts(data.post_list)
      setDescription(data.description)

      for (let i = 0; i < subbedCommunities.length; i++) {
        console.log(subbedCommunities);
        console.log(parseInt(communityId));
        if (parseInt(communityId) == subbedCommunities[i].id) {
          setSubbed(true);
        }
        //
      }
    }
  }, [communityId, data, description, subbedCommunities]);



  const [sortMethod, setSortMethod] = useState('default'); 

  const handleSortChange = (method: string) => {
    setSortMethod(method);
  };


  const handleInstructor = (instructor: Instructor) => {
    setInstructorModal(instructor)
  }


  const sortedPosts = [...posts].sort((a, b) => {
    if (sortMethod === 'mostUpvoted') {
      return (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length);
    } else if (sortMethod === 'mostDownvoted') {
      return (b.downvotes.length - b.upvotes.length) - (a.downvotes.length - a.upvotes.length);
    }
    // Default sorting (or any other custom sorting logic)
    return a.id - b.id; // Example: sorting by post ID
  });


  const handleSubscribe = async () => {
    //
    if (subbed) {
      //
      console.log('Subscribed to community');
      try {
        const pos = {
          user_id: userId,
          community_id: communityId
        };

        console.log(pos);
        const response = await axios.post(
          'http://localhost:8000/unsubscribe',
          pos
        );
        console.log(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Post failed', error.response?.data);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }

      setSubbed(false);
    } else {
      console.log('Subscribed to community');
      try {
        const pos = {
          user_id: userId,
          community_id: communityId
        };

        console.log(pos);
        const response = await axios.post(
          'http://localhost:8000/subscribe',
          pos
        );
        console.log(response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Post failed', error.response?.data);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
      setSubbed(true);
    }
  };

  if (dataState == false) {
    return <div>Loading</div>;
  } else
    return (
      <ComponentsLayout>
        <div className='flex flex-row justify-between'>
          <Sidebar />
          <div className='mb-24 ml-20 w-full md:mr-20'>
            <div className=' mt-12 min-h-[200px] w-full rounded-xl flex flex-row px-12 space-x-4'>
              <div className='bg-white rounded-lg min-w-[200px] py-2 px-4'>
                <h4 className='text-pink-600 mb-2'>
                  Prerequisites:
                </h4>
                {
                  data.prerequisites.length === 0 ? (
                    <div className="text-pink-600 w-full h-full flex flex-row items-center justify-center -mt-12"><GiTumbleweed className='text-6xl' /></div>
                  ) : (
                    data.prerequisites.map((item, index) => (
                      <div className='max-w-[100px] flex flex-row items-center' key={index}>
                        <UnstyledLink className='bg-pink-300 mb-2 text-white py-1 px-2 hover:bg-pink-500 rounded' href={'/community/' + item.id}>
                          {item.name}
                        </UnstyledLink>
                      </div>
                    ))
                  )
                }
              </div>

              <div className='bg-white rounded-lg min-w-[200px] py-2 px-4'>
                  <h4 className='text-pink-600 mb-2'>
                    Taught by:
                  </h4>
                  {data.instructors.map((item, index) => 
                    <div className='max-w-[100px] flex flex-row items-center' key={index}>
                      <div onClick={() => handleInstructor(item)} className='bg-pink-300 mb-2 cursor-pointer text-white py-1 px-2 hover:bg-pink-500 rounded'>
                        {item.name}
                      </div>
                    </div>
                  )} 
                </div>
              <div className='bg-white rounded-lg min-w-[200px] py-2 px-4 w-full'>
                <h4 className='text-pink-600'>
                  Course details:
                </h4>
                <div className='flex flex-col justify-evenly h-full'>

                  <div className=' -mt-8'>{description}</div>
                  <Button className='bg-pink-300 mt-8 hover:bg-pink-500' onClick={handleSubscribe}>
                    {subbed ? 'Unsubscribe' : 'Subscribe'}
                  </Button>
                </div>
              </div>
            </div>
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
        </div>
      </ComponentsLayout>
    );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  console.log(params);
  const resData = await axios.get(
    'http://127.0.0.1:8000/community/' + params.slug
  );
  // console.log(params.slug)
  const data: Array<Post> = resData.data;
  console.log(data);
  return {
    props: {
      data
    }
  };
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const resData = await axios.get('http://127.0.0.1:8000/all-communities');
  const communities: Array<Community> = resData.data;

  const paths = communities.map((community) => ({
    params: { slug: 'http://127.0.0.1:8000/community/' + community.id }
  }));
  // console.log(paths)
  return {
    paths,
    fallback: true
  };
}
