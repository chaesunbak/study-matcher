import { postReplyFormDataType } from '../models/post.model';
import { requestHandlerUser } from './usersApi/userHttp';

export const postReplyRequest = async (postReply: postReplyFormDataType | null) => {
  const response = await requestHandlerUser('post', `/replies`, postReply);
  return response.status;
};
