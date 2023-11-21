import axios from 'axios';
import { useEffect, useState } from 'react';

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
  const posts = useGlobalStore((state) => state.homepagePosts);

  useEffect(() => {
    setUser(glUser);
  }, [glUser]);

  updateCommunities(communities);

  if (user.exp != -1) {
    return (
      <ComponentsLayout>
        <div className=' flex flex-row justify-between'>
          <Sidebar />
          <div
            id='threads'
            className='relative mb-24 ml-8 mr-32 w-full flex-col justify-center bg-pink-300'
          >
            {posts.map((item, index) => (
              <div key={index}>
                <PostComponent
                  id={item.id}
                  author={item.author.username}
                  title={item.title}
                  community={item.community}
                  content={item.content}
                />
              </div>
            ))}
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
