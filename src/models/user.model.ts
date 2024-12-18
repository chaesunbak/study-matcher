type Gender = 'male' | 'female';

export interface User {
  id: number;
  email: string;
  username: string;
  gender: Gender;
  birth_date: string;
  profile_img: string;
  introduction: string;
  created_at: string;
}
