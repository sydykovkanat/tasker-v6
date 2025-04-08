import axios from 'axios';
import { toast } from 'sonner';

import { logout, useAuthStore } from '@/features/auth/store';

import { API_URL } from '@/shared/constants';

export const instance = axios.create({
	baseURL: API_URL,
});

instance.interceptors.request.use((request) => {
	const token = useAuthStore.getState().user?.token;

	if (token) {
		request.headers.set('Authorization', `Bearer ${token}`);
	}

	return request;
});

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 403) {
			toast.error('Доступ запрещен или сессия истекла!', {
				description: 'Пожалуйста, войдите в систему еще раз.',
			});
			logout();
		}

		return Promise.reject(error);
	},
);
