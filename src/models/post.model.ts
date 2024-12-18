export interface Post {
  id: number;
  meeting_id: number;
  user_id: number;
  title: string;
  img: string;
  created_at: Date;
  content: string;
  user: {
    id: number;
    profile_img: string;
    username: string;
  };
  replies: any[]; // TODO : any 타입을 Reply 타입으로 변경합니다.
}
