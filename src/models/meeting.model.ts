import { Topic } from './topic.model';
import { User } from './user.model';

export interface Meeting {
  id: number;
  title: string;
  topic_id: number;
  description: string;
  max_members: number;
  start_date: Date;
  end_date: Date;
  gender_condition: string;
  age_condition: string;
  owner_user_id: number;
  created_at: Date;
  topic: Topic;
}

export interface MeetingDetail extends Meeting {
  meeting_members: User[];
}