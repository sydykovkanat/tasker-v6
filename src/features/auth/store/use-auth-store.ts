import { isAxiosError } from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthSchemaType } from '@/features/auth/schemas';
import { authService } from '@/features/auth/services';
import { IUser } from '@/features/auth/types';

import { IError } from '@/shared/types';

interface Store {
	isLoggedIn: boolean;
	user: IUser | null;
	login: (body: AuthSchemaType) => Promise<void>;
	logout: () => void;
	loginError: IError | null;
	isLoading: boolean;
}

export const useAuthStore = create(
	persist<Store>(
		(set) => ({
			isLoading: false,
			isLoggedIn: false,
			loginError: null,
			user: null,
			login: async (body: AuthSchemaType) => {
				try {
					set({ isLoading: true, loginError: null });

					const user = await authService.login(body);

					if (user) {
						set({ isLoggedIn: true, user, isLoading: false });
					}
				} catch (err) {
					if (isAxiosError(err)) {
						if (err.response?.status === 400) {
							set({ loginError: err.response?.data });
						}
					}

					set({ isLoading: false });
				}
			},
			logout: () => {
				set({ isLoggedIn: false, user: null });
				localStorage.removeItem('tasker-user');
			},
		}),
		{
			name: 'tasker-user',
		},
	),
);
