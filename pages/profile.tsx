import '../src/styles/colors.css';
import '../src/styles/globals.css';

import { useGlobalStore } from '@/app/stores/UserStore';

import { Profile } from '@/types/Profile';

export default function Profile() {
  const profile = useGlobalStore((state) => state.profile);

  const nickname = profile.nickname;
  const bio = profile.bio;
  const profile_pic = profile.profile_pic;

  return (
    <div>
      <p>Nickname: {nickname}</p>
      <p>Bio: {bio}</p>
      <p>Profile Pic: {profile_pic}</p>
    </div>
  );
}
