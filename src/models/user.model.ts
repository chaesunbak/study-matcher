export enum Gender {
  male = '남성',
  female = '여성',
}

export interface User {
  id: number;
  email: string;
  password: string;
  gender: Gender;
  birthdate: Date;
  profile_img: string;
  introduction: string;
  created_at: Date;
}
