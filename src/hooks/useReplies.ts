import { useEffect, useState } from 'react';
import { postReplyFormDataType } from '../models/post.model';
import { postReplyRequest } from '../api/reply.api';
import { useQuery } from '@tanstack/react-query';

const useReplies = (postReply: postReplyFormDataType | null) => {
  const {
    data: status,
    isLoading: loading,
    error: replyError,
  } = useQuery({
    queryKey: ['replies-POST-status', postReply],
    queryFn: async () => await postReplyRequest(postReply),
    enabled: !!postReply,
  });

  return { status, loading, replyError };
};

export default useReplies;
