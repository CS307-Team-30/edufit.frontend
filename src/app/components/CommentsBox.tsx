import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import * as Yup from 'yup';

import { useGlobalStore } from '@/app/stores/UserStore';

interface FormValues {
  comment: string;
  post_id: number;
  user_id: number;
}

export default function CommentstBox() {
  const globPostId = useGlobalStore(state=> state.addCommentsModal)
  const [postId, setPostId] = useState(-1)

  useEffect(() => {
    setPostId(globPostId)
    console.log(globPostId)
  }, [globPostId])


  const globUserId = useGlobalStore(state => state.user.id)


  const postSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required')
  });

  const handleSubmit = async (values: FormValues) => {
    console.log(values)
    try {
      const pos = {...values, post_id: postId};
      console.log(pos);
      const response = await axios.post(
        'http://localhost:8000/add-comment',
        pos
      );
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Comment failed', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const initialValues = {
    // authtoken: authtoken,
    comment: '',
    post_id: postId,
    user_id: globUserId
  };
  const storeModalState = useGlobalStore((state) => state.setAddCommentsModal);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={postSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='z-30 h-full w-full rounded-lg bg-pink-50 px-4 py-4 text-pink-500 shadow-lg'>
          <div className=' mb-4 flex flex-row items-start justify-between'>
            <h3>Comment</h3>
            <motion.button
              onClick={() => storeModalState(-1)}
              className='left-1/2 text-pink-500'
            >
              <MdCancel className='text-xl' />
            </motion.button>
          </div>

          <Field
            type='text'
            as="textarea"
            name='comment'
            placeholder='Enter comment here'
            className='mb-2 min-h-[300px] w-full rounded border border-pink-300 p-2' // Updated padding
          />
          <ErrorMessage name='comment' component='div' />

          <button
            type='submit'
            className='mt-2 rounded bg-pink-500 p-2 text-white'
            disabled={isSubmitting}
          >
            Submit Comment
          </button>
        </Form>
      )}
    </Formik>
  );
}
