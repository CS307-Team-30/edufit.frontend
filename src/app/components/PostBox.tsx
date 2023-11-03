import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import * as Yup from 'yup';

import { useGlobalStore } from '@/app/stores/UserStore';

interface FormValues {
  postTitle: string
  postDescription: string
  communityId: number
}

export default function PostBox() {
  const [toggle, setToggle] = useState(true);

  const postSchema = Yup.object().shape({
    postTitle: Yup.string().required('Post title is required'),
    postDescription: Yup.string().required('Post description is required'),
    communityId: Yup.string().required('Community selection is required'),
  });

  const communities = useGlobalStore(state => state.communities)
  const authtoken = useGlobalStore(state => state.user.authenticationToken)

  const handleSubmit = async (values: FormValues) => {
    // console.log(values)
    try {
      const pos = {authToken: authtoken, ...values};
      console.log(pos)
      const response = await axios.post('http://localhost:8000/create-post', pos);
      console.log(response)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Post failed', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const initialValues = {
    // authtoken: authtoken,
    postTitle: '',
    postDescription: '',
    communityId: -1
  }



  return (
    <motion.div
      className='fixed bottom-0 right-1/4'
      initial={{ y: 0 }}
      animate={toggle ? { y: 250 } : { y: 0 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={postSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="min-h-[300px] w-[800px] text-pink-500 bg-pink-50 shadow-lg z-30 rounded-lg px-4 py-4">
            <div className='flex flex-row justify-between center'>
              <motion.button
                initial={{ rotate: 0, originX: 0, originY: 0 }}
                animate={toggle ? { rotate: 180 } : { rotate: 0 }}
                onClick={() => setToggle(!toggle)}
                className='text-pink-500 left-1/2'
              >
                <BsFillArrowDownCircleFill />
              </motion.button>
              <Field as="select" name="communityId" className="p-2 rounded border border-pink-300">
                <option value="">Select community</option>
                {communities.map(community => (
                  <option key={community.id} value={community.id}>{community.name}</option>
                ))}
              </Field>
            </div>
            <ErrorMessage name="communityId" component="div" />

            <h3>Post title</h3>
            <Field
              type="text"
              name="postTitle"
              placeholder="Enter post title"
              className="w-full p-2 mb-2 rounded border border-pink-300"
            />
            <ErrorMessage name="postTitle" component="div" />

            <h3>Post description</h3>
            <Field
              as="textarea"
              name="postDescription"
              placeholder="Enter post description"
              className="w-full p-2 mb-2 rounded border border-pink-300"
            />
            <ErrorMessage name="postDescription" component="div" />

            <button
              type="submit"
              className="mt-2 bg-pink-500 text-white p-2 rounded"
              disabled={isSubmitting}
            >
              Submit Post
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
}
