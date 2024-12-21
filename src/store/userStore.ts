import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UserInfo {
  email: string;
  sub: number;
  username: string;
  exp: number;
  iat: number;
}

interface State {
  user_info: UserInfo;
}

interface Actions {
  actions: {
    loginUser: (user_info: UserInfo) => void;
    logOutUser: () => void;
  };
}

const initialState: State = {
  user_info: {
    email: '',
    sub: 0,
    username: '',
    exp: 0,
    iat: 0,
  },
};

const saveUserInfoToSessionStorage = (user_info: UserInfo) => {
  sessionStorage.setItem('user_info', JSON.stringify(user_info));
};

const getUserInfoFromSessionStorage = (): UserInfo => {
  const userInfo = sessionStorage.getItem('user_info');
  return userInfo ? JSON.parse(userInfo) : initialState.user_info;
};

export const useUserStore = create(
  devtools<State & Actions>(
    (set) => ({
      user_info: getUserInfoFromSessionStorage(),
      actions: {
        loginUser: (user_info: UserInfo) => {
          saveUserInfoToSessionStorage(user_info);
          set({ user_info: user_info });
        },
        logOutUser: () => {
          sessionStorage.removeItem('user_info');
          set(initialState);
        },
      },
    }),
    { name: 'userStore' }
  )
);
