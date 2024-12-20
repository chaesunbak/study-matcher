import { useState, useEffect, useCallback } from 'react';
import { setPostData } from '../api/posts.api';

const usePostWrite = () => {
  const [status, setStatus] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await setPostData(formData);
      setStatus(data.status);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  }, []);

  return { status, fetchPost, loading, error };
};

export default usePostWrite;
