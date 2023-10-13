import { ErrorMessage,Field, Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});


interface FormValues {
  name: string;
  email: string;
  password: string;
}


type ErrorMessageComponentProps = {
  children?: React.ReactNode
}


const ErrorMessageComponent = ({children}: ErrorMessageComponentProps) => {
  return (
    <div className="absolute font-primary text-sm text-red-600 -translate-y-5">
      {children}
    </div>
  )
}

const RegistrationFormComponent: React.FC = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values: FormValues) => {
    // Handle form submission
    console.log(values);
  };


  return (
  <div className="bg-white mx-40 text-black font-bebas flex items-center justify-center h-screen"> 
      <div className='bg-amber-300'>

      </div>
      <div className="text-2xl flex flex-col pr-20 pl-20 my-20">
        <div className='w-full flex flex-col items-center justify-center'>
          <Image src="/images/logo.png" alt="logo" height={100} width={100}/>
          <h1 id="header" className='w-full text-black flex flex-row justify-center text-5xl mb-20'>Edu<span className='text-pink-300'>Fit</span></h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className='text-3xl  grid grid-rows-4 gap-12'>
              <div className='grid grid-cols-2'>
                <label htmlFor="name">Name:</label>
                <div className="relative font-primary">
                  <ErrorMessage name="name" component={ErrorMessageComponent} />
                  <Field type="text" id="name" name="name" />
                </div>
              </div>

              <div className='grid grid-cols-2'>
                <label htmlFor="email">Email:</label>
                <div className='relative font-primary'>
                  <ErrorMessage name="email" component={ErrorMessageComponent} />
                  <Field type="email" id="email" name="email" />
                </div>
              </div>

              <div className='grid grid-cols-2'>
                <label htmlFor="password">Password:</label>
                <div className='relative font-primary'>
                  <ErrorMessage name="password" component={ErrorMessageComponent} />
                  <Field type="password" id="password" name="password" />

                </div>
              </div>

              <div className='grid grid-cols-2'>
                <label htmlFor="password">Confirm password:</label>
                <div className='relative font-primary'>
                  <ErrorMessage name="password" component={ErrorMessageComponent} />
                  <Field type="password" id="password" name="password" />

                </div>
              </div>

              <div className='flex justify-center space-x-8'>
                <div className='border rounded-lg  bg-pink-300 hover:scale-105 transform duration-200 text-white px-6 py-2'>
                  <Link href="/homepage">Login</Link>
                </div>
                <div className='border rounded-lg  bg-pink-300 hover:scale-105 transform duration-200 text-white px-6 py-2'>
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


export default RegistrationFormComponent;