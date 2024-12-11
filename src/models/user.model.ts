export enum Gender {
  male = 'male',
  female = 'female',
}

export interface User {
  id: number;
  email: string;
  gender: Gender;
  birthdate: Date;
  profile_img: string;
  introduction: string;
  created_at: Date;
}
