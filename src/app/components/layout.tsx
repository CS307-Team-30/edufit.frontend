import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import '@/styles/colors.css';

import CommentsListComponent from '@/app/components/CommentListComponent';
import CommentstBox from '@/app/components/CommentsBox';
import InstructorBox from '@/app/components/InstructorBox';
import Navbar from '@/app/components/Navbar';
import { useGlobalStore } from '@/app/stores/UserStore';

// export const metadata: Metadata = {
//   title: 'Components',
//   description: 'Pre-built components with awesome default',
// };

export default function ComponentsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const addCommentsModal = useGlobalStore((state) => state.addCommentsModal);
  const setAddCommentsModal = useGlobalStore(
    (state) => state.setAddCommentsModal
  );

  const viewCommentsModal = useGlobalStore(state=>state.viewCommentsModal);
  const setViewCommentsModal = useGlobalStore(state=>state.setViewCommentsModal);
  

  const instructorModal = useGlobalStore(state => state.instructor)
  const setInstructorModal = useGlobalStore(state => state.updateInstructor)

  return (
    <div className='relative min-h-screen w-screen bg-pink-300'>
      <AnimatePresence>
      {(instructorModal.id != -1)  && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className='absolute z-40 h-full w-screen bg-black opacity-50 transition-opacity duration-300 hover:cursor-pointer'
            onClick={() => {setInstructorModal({...instructorModal, id: -1})}}
          ></motion.div>
        )}
        {instructorModal.id != -1 && (
          <motion.div
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className='fixed left-0 right-0 top-24 z-50 ml-auto mr-auto min-h-[100px] w-[750px] rounded-lg bg-white'
          >
            <InstructorBox />
          </motion.div>
        )}
        {(addCommentsModal != -1 || viewCommentsModal != -1)  && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className='absolute z-40 h-full w-screen bg-black opacity-50 transition-opacity duration-300 hover:cursor-pointer'
            onClick={() => {setAddCommentsModal(-1); setViewCommentsModal(-1)}}
          ></motion.div>
        )}
        {addCommentsModal != -1 && (
          <motion.div
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className='fixed left-0 right-0 top-24 z-50 ml-auto mr-auto min-h-[100px] w-[750px] rounded-lg bg-white'
          >
            <CommentstBox />
          </motion.div>
        )}
        {viewCommentsModal != -1 && (
          <motion.div
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className='fixed left-0 right-0 top-24 z-50 ml-auto mr-auto min-h-[100px] w-[750px] rounded-lg bg-white'
          >
            <CommentsListComponent postId={viewCommentsModal} />
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />
      {children}
    </div>
  );
}
