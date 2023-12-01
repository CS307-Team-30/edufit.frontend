import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { useGlobalStore } from '@/app/stores/UserStore';

import { initialProfileState,Profile } from '@/types/Profile';
import { initialUserState,User } from '@/types/User';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

interface FormValues {
  password: string;
  confirmPassword: string;
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

const UserDeleter: React.FC = () => {
  const initialValues: FormValues = {
    password: '',
    confirmPassword: '',
  };

  const router = useRouter();
  const user = useGlobalStore((state) => state.user);
  const id = useGlobalStore((state) => state.user.id);
  const updateUser = useGlobalStore((state) => state.updateUser);
  const updateProfile = useGlobalStore((state) => state.updateProfile);

  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (values: FormValues) => {
    try {
      // Check if passwords match
      if (values.password === values.confirmPassword) {
        const pos = { user_id: id, ...values };
        const response = await axios.post('http://localhost:8000/delete-user', pos);

        if (response.data.error == null && response.data.message != null) {
          updateUser(initialUserState);
          updateProfile(initialProfileState);
          router.push('/login');
        } else {
          // Handle errors here
          console.log(response.data.error);
        }
      } else {
        // Handle password mismatch
        setPasswordError('Passwords do not match');
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
    <section>
      <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Delete Account
          </h2>
          <div className="text-sm text-red-600 mb-4">
            Warning: This action cannot be undone. All your data will be permanently deleted.
          </div>

          {!isPasswordConfirmed ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                // Reset any previous error
                setPasswordError(null);

                // Check if the password is valid
                const isValid = validationSchema.isValidSync(values);

                if (isValid) {
                  setIsPasswordConfirmed(true);
                  handleSubmit(values); // Call the delete logic directly
                } else {
                  // Display an error message
                  setPasswordError('Invalid password');
                }
              }}
            >
              <Form>
                <div className="grid grid-cols-2 space-y-4">
                  <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-900 dark:text-white mt-8">
                    Password:
                  </label>
                  <div className="relative font-primary">
                    <ErrorMessage name="password" component={ErrorMessageComponent} />
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 space-y-4">
                  <label htmlFor="confirmPassword" className="mb-2 text-sm font-medium text-gray-900 dark:text-white mt-8">
                    Confirm Password:
                  </label>
                  <div className="relative font-primary">
                    <ErrorMessage name="confirmPassword" component={ErrorMessageComponent} />
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {passwordError && (
                  <div className="text-red-600 mt-4 mb-2 text-sm font-medium">{passwordError}</div>
                )}

                <div className="flex justify-center space-x-8 mt-6">
                  <div className=" rounded-lg bg-red-600 hover:bg-primary-700 transform duration-200 text-white px-6 py-2">
                    <button type="submit">DELETE ACCOUNT</button>
                  </div>
                </div>
              </Form>
            </Formik>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default UserDeleter;
