import { useState } from 'react';

import '../src/styles/colors.css';
import '../src/styles/globals.css';

import ImageUpload from '@/app/components/FileUpload';
import ComponentsLayout from '@/app/components/layout';
import PasswordConfirmationForm from '@/app/components/PasswordConfirm';
import UserProfile from '@/app/components/UserProfile';
import { useGlobalStore } from '@/app/stores/UserStore';

export default function Profile() {
  const profile = useGlobalStore((state) => state.profile);

  const nickname = profile.nickname;
  const bio = profile.bio;
  const profile_pic = profile.profile_pic;

  const [activeTab, setActiveTab] = useState('profile');

  return (
    <ComponentsLayout>
      <div className='mt-12 min-h-[500px] px-12 pt-20 md:mx-40'>
        <UserProfile nickname={nickname} bio={bio} profile_pic={profile_pic} />
      </div>

      <div className='flex mt-4 justify-center md:mx-40'>
        <button
          onClick={() => setActiveTab('image-upload')}
          className={`mx-2 text-lg py-2 px-4 rounded focus:outline-none ${
            activeTab === 'image-upload'
              ? 'bg-pink-500 text-white font-bold'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          Change Profile Picture
        </button>

        <button
          onClick={() => setActiveTab('password-confirmation')}
          className={`mx-2 text-lg py-2 px-4 rounded focus:outline-none ${
            activeTab === 'password-confirmation'
              ? 'bg-pink-500 text-white font-bold'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          Change Password
        </button>

        <button
          onClick={() => setActiveTab('deletion')}
          className={`mx-2 text-lg py-2 px-4 rounded focus:outline-none ${
            activeTab === 'deletion' ? 'bg-pink-500 text-white font-bold' : 'bg-gray-200 text-gray-500'
          }`}
        >
          Delete Account
        </button>
      </div>

      <div className='mt-12 min-h-[500px] px-12 pt-20 md:mx-40'>
        {activeTab === 'image-upload' && <ImageUpload />}
        {activeTab === 'password-confirmation' && <PasswordConfirmationForm />}
        {activeTab === 'deletion' && <div>Delete Account content goes here.</div>}
      </div>
    </ComponentsLayout>
  );
}
