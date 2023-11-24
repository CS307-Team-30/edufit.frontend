import ComponentsLayout from '@/app/components/layout';

import '../src/styles/colors.css';
import '../src/styles/globals.css';

import { useGlobalStore } from '@/app/stores/UserStore';

import { Profile } from '@/types/Profile';
import UserDeleter from '@/app/components/UserDeleter';

export default function Profile() {
  const user = useGlobalStore((state) => state.user);

  return (
    <ComponentsLayout>
      <div className='mt-12 min-h-[500px] bg-white px-12 pt-20 md:mx-40'>
        <h1>Account deletions cannot be reversed.</h1>
        <h2>If you are absolutely sure you want to proceed, please enter your password.</h2>
        <UserDeleter />
      </div>
    </ComponentsLayout>
  );
}
