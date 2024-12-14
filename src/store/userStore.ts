import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  userId: string;
}

interface Actions {
  actions: {
    loginUser: (email: string) => void;
    logOutUser: () => void;
  };
}

const initialState: State = {
  userId: '',
};

export const useUserStore = create(
  devtools<State & Actions>((set) => ({
    ...initialState,
    actions: {
      loginUser: (userId: string) => {
        set({ userId: userId });
        localStorage.setItem('register', JSON.stringify({ email: userId }));
      },
      logOutUser: () => set(initialState),
    },
  }))
);
