import { Editor } from '@tinymce/tinymce-react';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { useRef } from 'react';

import '@/styles/colors.css';

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

  const commentsListModal = useGlobalStore((state) => state.commentsModal);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div className='relative min-h-screen w-screen bg-pink-300'>
      <AnimatePresence>
        {addCommentsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className='absolute z-40 h-full w-screen bg-black opacity-50 transition-opacity duration-300 hover:cursor-pointer'
            onClick={() => setAddCommentsModal(false)}
          ></motion.div>
        )}
        {addCommentsModal && (
          <motion.div
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className='fixed left-0 right-0 top-24 z-50 ml-auto mr-auto h-[600px] w-[750px] rounded-lg bg-white'
          >
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue='<p>This is the initial content of the editor.</p>'
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />
      {children}
    </div>
  );
}
