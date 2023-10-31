import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as Yup from 'yup';

import { useGlobalStore } from '@/app/stores/UserStore';

import { User } from '@/types/User';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

interface FormValues {
  username: string;
  password: string;
}

type ErrorMessageComponentProps = {
  children?: React.ReactNode;
};

const ErrorMessageComponent = ({ children }: ErrorMessageComponentProps) => {
  return (
    <div className="absolute font-primary text-sm text-red-600 -translate-y-5">
      {children}
    </div>
  );
};

const FormComponent: React.FC = () => {
  const initialValues: FormValues = {
    username: '',
    password: '',
  };


  const user = useGlobalStore((state) => state.user)
  const updateUser = useGlobalStore((state) => state.updateUser)
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    // console.log(values)
    try {
      const response = await axios.post('http://localhost:8000/login', values);

      // console.log(response.data.token)
      const responseToken: string = response.data.token
      const decodedToken: User = jwtDecode(responseToken)
      console.log(decodedToken)
      updateUser({...user, ...decodedToken})
      router.push("/homepage")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Authentication failed:', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <div className="bg-white mx-40 text-black font-bebas flex items-center justify-center h-screen">
      <div className='bg-amber-300'></div>
      <div className="text-2xl flex flex-col pr-20 pl-20 my-20">
        <div className='w-full flex flex-col items-center justify-center'>
          <Image src="/images/logo.png" alt="logo" height={100} width={100} />
          <h1 id="header" className='w-full text-black flex flex-row justify-center text-5xl mb-20'>Edu<span className='text-pink-300'>Fit</span></h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className='text-3xl grid grid-rows-3 gap-12'>
              <div className='grid grid-cols-2'>
                <label htmlFor="username">Username:</label>
                <div className="relative font-primary">
                  <ErrorMessage name="username" component={ErrorMessageComponent} />
                  <Field type="text" id="username" name="username" />
                </div>
              </div>

              <div className='grid grid-cols-2'>
                <label htmlFor="password">Password:</label>
                <div className='relative font-primary'>
                  <ErrorMessage name="password" component={ErrorMessageComponent} />
                  <Field type="password" id="password" name="password" />
                </div>
              </div>

              <div className='flex justify-center space-x-8'>
                <div className='border rounded-lg bg-pink-300 hover:scale-105 transform duration-200 text-white px-6 py-2'>
                  <button type="submit">Login</button>
                </div>
                <div className='border rounded-lg bg-pink-300 hover:scale-105 transform duration-200 text-white px-6 py-2'>
                  <Link href="/register">Register</Link>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default FormComponent;
