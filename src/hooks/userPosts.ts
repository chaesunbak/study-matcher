import { useEffect, useState } from 'react';
import { PostWithUser } from '../models/post.model';
import { getPostsOfGroup } from '../api/posts.api';
import { useQuery } from '@tanstack/react-query';

const useMeetingPosts = (meetingId: number) => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['posts-method-data', meetingId],
    queryFn: async () => await getPostsOfGroup({ meeting_id: meetingId, page: 1 }),
    enabled: !!meetingId && meetingId !== 1,
  });

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
      setTotal(data.total);
      setCurrentPage(data.currentPage);
      setTotalPage(data.totalPage);
    }
  }, [data]);

  return { posts, total, refetch, currentPage, totalPage, isLoading, error };
};

export default useMeetingPosts;
