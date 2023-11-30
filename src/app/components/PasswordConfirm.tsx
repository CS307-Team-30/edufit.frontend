import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';

import { useGlobalStore } from '@/app/stores/UserStore';

import { User } from '@/types/User';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  confirmation: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required')
});


interface FormValues {
  password: string;
  confirmation: string;
}


type ErrorMessageComponentProps = {
  children?: React.ReactNode
}


const ErrorMessageComponent = ({ children }: ErrorMessageComponentProps) => {
  return (
    <div className="absolute font-primary text-sm text-red-600 -translate-y-5">
      {children}
    </div>
  )
}

const RegistrationFormComponent: React.FC = () => {
  const initialValues: FormValues = {
    password: '',
    confirmation: '',
  };

  const router = useRouter()
  const user = useGlobalStore((state) => state.user)
  const authtoken = useGlobalStore(state => state.user.authenticationToken)

  const handleSubmit = async (values: FormValues) => {
    // console.log(values)
    try {
      const response = await axios.post('http://localhost:8000/change-password',
        {
          authToken: authtoken,
          password: values.password,
          confirmation: values.confirmation
        });

      if (response.data.error) {
        console.log("Error: " + response.data.error)
      } else if (response.data.msg) {
        console.log(response.data.msg)
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration failed:', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <div className="bg-white mx-40 text-black font-bebas flex items-center justify-center h-screen">
      <div className='bg-amber-300'>

      </div>
      <div className="text-2xl flex flex-col pr-20 pl-20 my-20">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className='text-3xl  grid grid-rows-4 gap-12'>

              <div className='grid grid-cols-2'>
                <label htmlFor="password">New Password:</label>
                <div className='relative font-primary'>
                  <ErrorMessage name="password" component={ErrorMessageComponent} />
                  <Field type="password" id="password" name="password" />
                </div>
              </div>

              <div className='grid grid-cols-2'>
                <label htmlFor="password">Confirm:</label>
                <div className='relative font-primary'>
                  <ErrorMessage name="confirmation" component={ErrorMessageComponent} />
                  <Field type="password" id="confirmation" name="confirmation" />
                </div>
              </div>

              <div className='flex justify-center space-x-8'>
                <div className='border rounded-lg  bg-pink-300 hover:scale-105 transform duration-200 text-white px-6 py-2'>
                  <button type="submit">Change Password</button>
                </div>
              </div>

            </div>
          </Form>
        </Formik>


      </div>


    </div>

  );
};



export default RegistrationFormComponent