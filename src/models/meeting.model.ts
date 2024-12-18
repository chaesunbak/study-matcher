import { Post } from './post.model';
import { User } from './user.model';

export interface Meeting {
  id: number;
  title: string;
  topic_id: number;
  description: string;
  max_members: number;
  start_date: string;
  end_date: string;
  gender_condition: string;
  age_condition: string;
  owner_user_id: number;
  created_at: string;
  posts: Post[];
}

export interface MeetingDetail {
  id: number;
  title: string;
  topic_id: number;
  description: string;
  max_members: number;
  start_date: string;
  end_date: string;
  gender_condition: string;
  age_condition: string;
  owner_user_id: number;
  created_at: string;
  meeting_users: MeetingUser[];
}

export interface MeetingUser {
  id: number;
  meeting_id: number;
  user_id: number;
  role: string;
  is_active: boolean;
  user: User;
}
