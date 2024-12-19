import { useEffect, useState } from 'react';
import { UserResponse } from '../models/user.model';
import { getUserDataes } from '../api/usersApi/userApis';

const useUsers = () => {
  const [userData, setUserData] = useState<UserResponse>({
    email: '',
    username: '',
    gender: '남성',
    birth_date: '',
    profile_img: '',
    introduction: '',
    id: 0,
    created_at: '',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserDataes();
        setUserData(data);
      } catch (error) {
        console.error(error);
        setError('get userData fetching error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
};

export default useUsers;
