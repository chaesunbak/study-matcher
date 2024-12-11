import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
	email: string;
	password: string;
}

interface Actions {
	actions: {
		setEmail: (email: string) => void;
		setPassword: (password: string) => void;
		logOutUser: () => void;
	};
}

const initialState: State = {
	email: "",
	password: "",
};

export const useUserStore = create(
	devtools<State & Actions>((set) => ({
		...initialState,
		actions: {
			setEmail: (email: string) => set({ email: email }),
			setPassword: (password: string) => set({ password: password }),
			logOutUser: () => set(initialState),
		},
	})),
);
