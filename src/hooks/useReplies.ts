import { postReplyFormDataType } from '../models/post.model';
import { postReplyRequest } from '../api/reply.api';
import { useQuery } from '@tanstack/react-query';

const useReplies = (postReply: postReplyFormDataType | null) => {
  const {
    data: statusPost,
    isLoading: loading,
    error: replyError,
  } = useQuery({
    queryKey: ['replies-POST-status', postReply],
    queryFn: async () => await postReplyRequest(postReply),
    enabled: !!postReply,
    structuralSharing: true,
  });

  return { statusPost, loading, replyError };
};

export default useReplies;
