import '../src/styles/colors.css';
import '../src/styles/globals.css';

import ComponentsLayout from '@/app/components/layout';
import UserForm from '@/app/components/UserForm';

export default function UserPage() {
  return (
    <ComponentsLayout>
      <div className='mt-12 min-h-[500px] rounded-lg bg-white px-12 pt-20 md:mx-40'>
        <UserForm />
      </div>
    </ComponentsLayout>
  );
}
