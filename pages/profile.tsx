import UserProfile from '@/app/components/UserProfile';
import ComponentsLayout from '@/app/components/layout';
import ImageUpload from '@/app/components/FileUpload';

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
    <ComponentsLayout>
      <div className='mt-12 min-h-[500px] bg-white px-12 pt-20 md:mx-40'>
        <UserProfile nickname={nickname} bio={bio} profile_pic={profile_pic} />
      </div>
      <div className='mt-12 min-h-[500px] bg-white px-12 pt-20 md:mx-40'>
        <ImageUpload />
      </div>
    </ComponentsLayout>
  );
}
