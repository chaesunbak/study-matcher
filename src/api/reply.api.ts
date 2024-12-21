import { postReplyFormDataType } from '../models/post.model';
import { requestHandlerUser } from './usersApi/userHttp';

export const postReplyRequest = async (postReply: postReplyFormDataType | null) => {
  const response = await requestHandlerUser('post', `/replies`, postReply);
  return response.status;
};

export const putReplyRequest = async (putReply: string, replyId: number) => {
  console.log('putReply : ', putReply, 'replyId : ', replyId);
  const response = await requestHandlerUser('put', `/replies/${replyId}`, { content: putReply });
  return response.status;
};

export const deleteReplyRequest = async (replyId: number) => {
  const response = await requestHandlerUser('delete', `/replies/${replyId}`);
  return response.status;
};
