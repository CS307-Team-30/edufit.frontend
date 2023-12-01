import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useGlobalStore } from '@/app/stores/UserStore';
import axios from 'axios';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const user = useGlobalStore((state) => state.user);
  const profile = useGlobalStore((state) => state.profile);
  const router = useRouter();

  const updateProfile = useGlobalStore((state) => state.updateProfile);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : '';
    setSelectedFile(file);

    updateProfile({
      user_id: profile.user_id,
      nickname: profile.nickname,
      bio: profile.bio,
      profile_pic: fileName,
    });

    const response = await axios.post(
      'http://localhost:8000/update-profile-pic',
      {
        token: user.authenticationToken,
        new_pic: fileName
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:8000/upload-image', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            router.push('/homepage');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button onClick={handleSubmit}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold">
          Submit Chosen Photo
        </button>
      </label>
    </div>
  );
}

export default ImageUpload;
