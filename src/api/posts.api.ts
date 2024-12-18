import { httpClient } from './http';
import { Post, PostDetail } from '../models/post.model';

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
