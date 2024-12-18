import { Outlet, useParams } from 'react-router';
import UserHeaderForm from '../UserHeaderForm';

const ProfileLayout = () => {
  const user_id = useParams<{ user_id: string }>();
  return (
    <div className="bg-gray-50 flex min-h-screen">
      <UserHeaderForm mode="leftMenu" />

      {/* 오른쪽 콘텐츠 */}
      <div className="w-3/4 p-6">
        <Outlet context={{ user_id }} />
      </div>
    </div>
  );
};

export default ProfileLayout;
