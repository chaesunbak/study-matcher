import { Reply } from './reply.model';

export interface Post {
  id: number;
  meeting_id: number;
  user_id: number;
  title: string;
  img: string;
  content: string;
  created_at: string;
}

export interface PostWithUser extends Post {
  user: {
    id: number;
    profile_img: string;
    username: string;
  };
}

export interface PostDetail extends Post {
  user: {
    id: number;
    profile_img: string;
    username: string;
  };
  replies: Reply[]; // TODO : any 타입을 Reply 타입으로 변경합니다.
}

export interface postReplyFormDataType {
  post_id: number;
  content: string;
  parent_reply_id: number | null;
}

export interface putPostFormDataType {
  title: string;
  img: string;
  content: string;
}

export interface postPostFromDataType extends putPostFormDataType {
  meeting_id: number;
}
