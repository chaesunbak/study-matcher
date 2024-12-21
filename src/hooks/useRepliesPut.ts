import { putReplyRequest } from '../api/reply.api';
import { useQuery } from '@tanstack/react-query';

const useRepliesPut = (putReply: string, replyId: number) => {
  const {
    data: statusPut,
    isLoading: loading,
    error: replyError,
  } = useQuery({
    queryKey: ['replies-PUT-status', putReply, replyId],
    queryFn: async () => await putReplyRequest(putReply, replyId),
    enabled: replyId > 0 && putReply.trim().length > 0,
  });

  return { statusPut, loading, replyError };
};

export default useRepliesPut;
