import { User } from './user.model';

export interface Posting {
  id: number;
  meeting_id: number;
  user_id: number;
  title: string;
  img: string;
  content: string;
  created_at: Date;
}

export interface Reply {
  id: number;
  posting_id: number;
  user_id: number;
  content: string;
  reply_id: number;
  created_at: Date;
}

export interface ReplyLike {
  id: number;
  reply_id: number;
  user_id: number;
  created_at: Date;
}

export interface PostingDetail extends Posting {
  user: User;
  replies: Reply[];
}
