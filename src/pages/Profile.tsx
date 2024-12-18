import { useOutletContext, useParams } from 'react-router';
import ProfileForm from '../components/user/ProfileMenu/ProfileForm';

interface ContextType {
  user_id: string;
}

const Profile = () => {
  const { user_id } = useOutletContext<ContextType>();
  return (
    <div>
      <ProfileForm user_id={user_id} />
    </div>
  );
};

export default Profile;
