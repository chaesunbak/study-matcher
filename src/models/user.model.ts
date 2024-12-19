type Gender = '남성' | '여성';

export interface User {
  email: string;
  password?: string;
  username: string;
  gender: Gender;
  birth_date: string;
  profile_img: string;
  introduction: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface UserResponse extends User {
  id: number;
  created_at: string;
}
