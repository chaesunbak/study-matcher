import { useState, useEffect } from 'react';
import { Post } from '../models/post.model';
import { getPostsOfGroup } from '../api/posts.api';

const useMeetingPosts = (meetingId: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getPostsOfGroup({ meeting_id: meetingId, page: 1 });
        setPosts(response.posts);
        setTotal(response.total);
        setCurrentPage(response.currentPage);
        setTotalPage(response.totalPage);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [meetingId]);

  return { posts, total, currentPage, totalPage, loading, error };
};

export default useMeetingPosts;
