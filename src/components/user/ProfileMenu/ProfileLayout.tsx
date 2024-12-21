import { Outlet } from 'react-router';
import UserHeaderForm from '../UserHeaderForm';

const ProfileLayout = () => {
  return (
    <div className="flex min-h-screen gap-6">
      <UserHeaderForm mode="leftMenu" className="hidden md:flex" />

      {/* 오른쪽 콘텐츠 */}
      <div className="mx-auto w-full md:w-3/4">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
