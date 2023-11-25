import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useGlobalStore } from '@/app/stores/UserStore';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const profile = useGlobalStore((state) => state.profile)
  const router = useRouter();

  const updateProfile = useGlobalStore((state) => state.updateProfile)

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const fileName = file ? file.name : '';
    setSelectedFile(file);

    updateProfile(
      {
        user_id: profile.user_id,
        nickname: profile.nickname,
        bio: profile.bio,
        profile_pic: fileName
      }
    )
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Send the file to the server using a fetch or Axios request
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
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload Image</button>
      </form>
      {uploadStatus !== null && <p>{uploadStatus}</p>}
    </div>
  );
}

export default ImageUpload;