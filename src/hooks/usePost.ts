import { getPost } from '../api/posts.api';
import { useQuery } from '@tanstack/react-query';

const usePost = (postId: number) => {
  // const [post, setPost] = useState<PostDetail | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  const {
    data: post,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => await getPost(postId),
    enabled: !!postId,
  });

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const data = await getPost(postId);
  //       setPost(data);
  //     } catch (error) {
  //       console.error(error);
  //       setError('Failed to fetch post');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (postId) {
  //     fetchPost();
  //   } else {
  //     setPost(null);
  //     setLoading(false);
  //   }
  // }, [postId]);

  return { post, refetch, isLoading, error };
};

export default usePost;
