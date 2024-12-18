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
  replies: any[]; // TODO : any 타입을 Reply 타입으로 변경합니다.
}
