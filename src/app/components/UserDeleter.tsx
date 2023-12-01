import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { useGlobalStore } from '@/app/stores/UserStore';

import { User, initialUserState } from '@/types/User';
import { Profile, initialProfileState } from '@/types/Profile';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});


interface FormValues {
  password: string;
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



const UserDeleter: React.FC = () => {
  const initialValues: FormValues = {
    password: '',
  };

  const router = useRouter()
  const user = useGlobalStore((state) => state.user)
  const id = useGlobalStore(state => state.user.id)
  const updateUser = useGlobalStore((state) => state.updateUser)
  const updateProfile = useGlobalStore((state) => state.updateProfile)

  // State to control the visibility of the error message
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to show the error message
  const showError = (message) => {
    setErrorMessage(message);
  };

  var result_message = "Confirm your password before changing it."

  const handleSubmit = async (values: FormValues) => {
    // console.log(values)
    try {

      const pos = { user_id: id, ...values };
      const response = await axios.post('http://localhost:8000/delete-user', pos);

      if ((response.data.error == null) && (response.data.message != null)) {
        updateUser(initialUserState)
        updateProfile(initialProfileState)
        router.push('/login');
      } else if (response.data.error != null) {
        result_message = response.data.error
        showError("Error: " + result_message)
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Deletion failed', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <div className="bg-white mx-40 text-black font-bebas flex items-center justify-center h-screen">
      <div className="text-2xl flex flex-col pr-20 pl-20 my-20">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>

              <div className='grid grid-cols-2'>
                <label htmlFor="password">Password:</label>
                <div className='relative font-primary'>
                  <ErrorMessage name="password" component={ErrorMessageComponent} />
                  <Field type="password" id="password" name="password" />

                </div>
              </div>

              <div className='flex justify-center space-x-8'>
                <div className='border rounded-lg  bg-pink-300 hover:scale-105 transform duration-200 text-white px-6 py-2'>
                  <button type="submit">Submit</button>
                </div>
              </div>

              {errorMessage && (
                <div className="error-modal justify-center">
                  <h3>{errorMessage}</h3>
                </div>
              )}

            </div>
          </Form>
        </Formik>


      </div>


    </div>

  );
};



export default UserDeleter

function updateUser(initialUserState: User) {
  throw new Error('Function not implemented.');
}
function updateProfile(initialProfileState: Profile) {
  throw new Error('Function not implemented.');
}

