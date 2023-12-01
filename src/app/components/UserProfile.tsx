import React, { useEffect, useState } from 'react';

// import 'src/styles/profile.css';

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
    fetch('http://localhost:8000/images/' + profile_pic) // Replace with the actual endpoint URL
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
    <div className="user-profile flex items-center justify-center flex-col space-y-4">
      <div className="profile-picture rounded-full w-64 h-64 overflow-hidden border-4 border-white">
      <img
        className="w-full h-full object-cover"
        src="/images/mh-3-23-coleman-1648059910.png"
        alt={`${nickname}'s profile`}
      />

      </div>
      <div className="user-info text-center">
        <main className='container'>
          <section className="animation">
            <div className="first"><div>{nickname}</div></div>
            <div className="second"><div>Educated</div></div>
            <div className="third"><div>Physically fit</div></div>
          </section>
        </main>
        <p className='text-white'>{bio}</p>
      </div>
    </div>
  );
}

export default UserProfile;
