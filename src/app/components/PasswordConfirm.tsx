import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useGlobalStore } from '@/app/stores/UserStore';

const RegistrationFormComponent: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmationError, setConfirmationError] = useState('');

  const router = useRouter();
  const authtoken = useGlobalStore((state) => state.user.authenticationToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error messages
    setPasswordError('');
    setConfirmationError('');

    try {
      if (password.length < 4) {
        setPasswordError('Password must be at least 4 characters long');
        return;
      }

      if (password !== confirmation) {
        setConfirmationError('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:8000/change-password', {
        authToken: authtoken,
        password,
        confirmation,
      });

      if (response.data.error) {
        console.log(response.data.error);
      } else if (response.data.msg) {
        router.push('/homepage');
        console.log(response.data.msg);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Change password failed:', error.response?.data);
        console.error('Change password failed:', error.response?.data);
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
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
                value={confirmation}
                onChange={(e) => {
                  setConfirmation(e.target.value);
                  setConfirmationError('');
                }}
              />
              {confirmationError && <p className="text-red-500 text-sm">{confirmationError}</p>}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-pink-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onSubmit={handleSubmit}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationFormComponent;
