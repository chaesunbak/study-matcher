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

export const useUserStore = create(
  devtools<State & Actions>(
    (set) => ({
      ...initialState,
      actions: {
        loginUser: (user_info: UserInfo) => {
          set({ user_info: user_info });
        },
        logOutUser: () => set(initialState),
      },
    }),
    { name: 'userStore' }
  )
);
