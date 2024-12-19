import { UserResponse } from '../../models/user.model';
import { requestHandlerUser } from './userHttp';

export const getUserDataes = async (): Promise<UserResponse> => {
  const response = await requestHandlerUser('get', '/users/me');
  return response.data;
};
