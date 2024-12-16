import { useParams } from 'react-router';
import ProfileForm from '../components/user/ProfileForm';

const Profile = () => {
  const { user_id } = useParams<{ user_id: string }>();
  return (
    <div>
      <ProfileForm user_id={user_id} />
    </div>
  );
};

export default Profile;
