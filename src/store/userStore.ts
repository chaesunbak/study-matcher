import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  userJwt: string;
}

interface Actions {
  actions: {
    loginUser: (email: string) => void;
    logOutUser: () => void;
  };
}

const initialState: State = {
  userJwt: '',
};

export const useUserStore = create(
  devtools<State & Actions>((set) => ({
    ...initialState,
    actions: {
      loginUser: (userJwt: string) => {
        set({ userJwt: userJwt });
      },
      logOutUser: () => set(initialState),
    },
  }))
);
