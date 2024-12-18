import { Outlet } from 'react-router';
import UserHeaderForm from '../UserHeaderForm';

const ProfileLayout = () => {
  return (
    <div className="bg-gray-50 flex min-h-screen">
      <UserHeaderForm mode="leftMenu" />

      {/* 오른쪽 콘텐츠 */}
      <div className="w-3/4 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
