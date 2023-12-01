import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface UserProfileData {
  nickname: string;
  bio: string;
  profile_pic: string;
}

function UserProfile(data: UserProfileData) {
  const { nickname, bio, profile_pic } = data;

  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    // Fetch the image URL from the server
    fetch('http://localhost:8000/images/' + profile_pic)  // Replace with the actual endpoint URL
      .then((response) => {
        if (response.ok) {
          return response.url;
        }
        throw new Error('Failed to fetch image.');
      })
      .then((url) => {
        setImageURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="user-profile">
      <div className="profile-picture">
        <img src={imageURL} alt={`${nickname}'s profile`} />
      </div>
      <div className="user-info">
        <h2>{nickname}</h2>
        <p>{bio}</p>
      </div>
    </div>
  );
}

export default UserProfile;