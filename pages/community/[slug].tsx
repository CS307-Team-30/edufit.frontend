import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import '../../src/styles/colors.css';
import '../../src/styles/globals.css';

import Button from '@/components/buttons/Button';

import ComponentsLayout from '@/app/components/layout';
import PostComponent from '@/app/components/PostComponent';
import Sidebar from '@/app/components/Sidebar';
import { useGlobalStore } from '@/app/stores/UserStore';

import { Community } from '@/types/Community';
import { Post } from '@/types/Post';

type CommunityPageProps = {
  data: Array<Post>;
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

  useEffect(() => {
    if (data != undefined) {
      setDataState(true);

      for (let i = 0; i < subbedCommunities.length; i++) {
        console.log(subbedCommunities);
        console.log(parseInt(communityId));
        if (parseInt(communityId) == subbedCommunities[i].id) {
          setSubbed(true);
        }
        //
      }
    }
  }, [communityId, data, subbedCommunities]);

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
            <div className=' mt-12 min-h-[200px] w-full rounded-xl bg-white px-12 pt-20 '>
              <Button className='bg-pink-300' onClick={handleSubscribe}>
                {subbed ? 'Unsubscribe' : 'Subscribe'}
              </Button>
            </div>
            {data.map((item, index) => (
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
