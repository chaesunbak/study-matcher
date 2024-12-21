import { httpClient } from './http';
import { Post, PostDetail, postPostFromDataType } from '../models/post.model';
import { requestHandlerUser } from './usersApi/userHttp';

interface PostsResponse {
  posts: Post[];
  total: number;
  currentPage: number;
  totalPage: number;
}

interface getPostsOfMeetingParams {
  meeting_id?: number;
  page: number;
}

export const getPostsOfGroup = async (params: getPostsOfMeetingParams): Promise<PostsResponse> => {
  const response = await httpClient.get<PostsResponse>(`/posts`, { params });
  return response.data;
};

export const getPost = async (postId: number): Promise<PostDetail> => {
  const response = await httpClient.get<PostDetail>(`/posts/${postId}`);
  return response.data;
};

export const setPostData = async (formData: postPostFromDataType) => {
  const response = await requestHandlerUser('post', `/posts`, formData);
  return response.data;
};
