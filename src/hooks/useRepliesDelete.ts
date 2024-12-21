import { deleteReplyRequest } from '../api/reply.api';
import { useQuery } from '@tanstack/react-query';

const useRepliesDelete = (replyId: number) => {
  const {
    data: statusDelete,
    isLoading: loading,
    error: replyError,
  } = useQuery({
    queryKey: ['replies-DELETE-status', replyId],
    queryFn: async () => await deleteReplyRequest(replyId),
    enabled: !!replyId,
  });

  return { statusDelete, loading, replyError };
};

export default useRepliesDelete;
