import { setPostData } from '../api/posts.api';
import { postPostFromDataType } from '../models/post.model';
import { useQuery } from '@tanstack/react-query';

const usePostWrite = (formData: postPostFromDataType) => {
  const {
    data: status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['postWrite', formData],
    queryFn: async () => await setPostData(formData),
    enabled: !!formData,
  });

  return { status, isLoading, error };
};

export default usePostWrite;
