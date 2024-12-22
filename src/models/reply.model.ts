export interface Reply {
  id: number;
  post_id: number;
  user_id: number;
  is_show: boolean;
  content: string;
  created_at: string;
  parent_reply_id: number | null;
}
