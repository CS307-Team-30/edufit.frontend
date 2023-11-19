import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { FaEllipsisH } from 'react-icons/fa';

import UnstyledLink from '@/components/links/UnstyledLink';

import { useGlobalStore } from '@/app/stores/UserStore';

import { Community } from '@/types/Community';

type PostComponentProps = {
  id: number;
  title: string;
  author: string;
  community: Community;
  content: string;
};

const PostComponent = ({
  title,
  author,
  community,
  content,
  id
}: PostComponentProps) => {
  const username = useGlobalStore((state) => state.user.username);
  const [displayOptions, setDisplayOptions] = useState(false);

  const setAddCommentsModal = useGlobalStore(
    (state) => state.setAddCommentsModal
  );

  useEffect(() => {
    setDisplayOptions(username != author);
  }, [author, username]);

  const handleDelete = async () => {
    const response = await axios.delete(
      'http://localhost:8000/delete-post/' + id,
      {}
    );
    console.log(response);
  };

  const handleEdit = async () => {
    const response = await axios.delete(
      'http://localhost:8000/delete-post/' + id,
      {}
    );
    console.log(response);
  };

  const [currId, setCurrId] = useState(-1);

  return (
    <motion.div className='relative m-2 mx-16 mt-8 rounded-lg bg-white px-10 py-8 hover:border-[0.5px] hover:border-black'>
      <div className='flex flex-row justify-between'>
        <h3 className='text-pink-600'>{title}</h3>
        <div className='flex flex-row items-center space-x-8'>
          <div className='font-bold text-pink-600'>{author}</div>
          <UnstyledLink
            className='flex w-full justify-end rounded bg-pink-300 px-2 py-1 font-bold text-white hover:bg-pink-500'
            href={'/community/' + community.id}
          >
            {community.name}
          </UnstyledLink>
          <div className='flex flex-col space-y-2'>
            <div
              onClick={() => {
                setDisplayOptions(!displayOptions);
                setCurrId(currId == -1 ? id : -1);
              }}
              className='relative flex justify-end'
            >
              <FaEllipsisH className='text-pink-700 hover:cursor-pointer' />
              <div className='absolute top-4 rounded border'>
                <div
                  onClick={handleDelete}
                  className={` rounded bg-white px-4 py-2 hover:bg-pink-300 ${
                    !displayOptions || currId != id ? 'hidden' : ''
                  }`}
                >
                  Delete
                </div>
                <div
                  onClick={handleEdit}
                  className={` rounded bg-white px-4 py-2 hover:bg-pink-300 ${
                    !displayOptions || currId != id ? 'hidden' : ''
                  }`}
                >
                  Edit
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='grid grid-cols-3'>

        </div> */}
      </div>
      <div className='flex flex-col'>
        <p className='mt-4'>{content}</p>
      </div>
      <div className='mt-4 flex flex-row justify-between'>
        <div className='space-x- mt-4 flex flex-row items-center text-2xl text-pink-600'>
          <BiUpvote className='hover:cursor-pointer' />
          <div className='mx-2 text-sm font-bold'>{0}</div>
          <BiDownvote className='hover:cursor-pointer' />
        </div>
        <div>
          <button
            onClick={() => {
              console.log('View comments');
            }}
            className='mr-4 mt-4 h-[40px] w-[200px] rounded bg-pink-300 px-2 py-1 text-white hover:border hover:bg-pink-400'
          >
            View Comments
          </button>
          <button
            onClick={() => {
              setAddCommentsModal(true);
            }}
            className='mt-4 h-[40px] w-[200px] rounded bg-pink-300 px-2 py-1 text-white hover:border hover:bg-pink-400'
          >
            Add Comment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostComponent;
