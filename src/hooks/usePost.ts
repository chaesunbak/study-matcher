import { useState, useEffect } from 'react';
import { PostDetail } from '../models/post.model';
import { getPost } from '../api/posts.api';

const usePost = (postId: number) => {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPost(postId);
        setPost(data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    } else {
      setPost(null);
      setLoading(false);
    }
  }, [postId]);

  return { post, loading, error };
};

export default usePost;
