import { AuthSchemaType } from '@/features/auth/schemas';
import { IUser } from '@/features/auth/types';

import { instance } from '@/shared/api';

class AuthService {
	public async login(body: AuthSchemaType) {
		return (
			await instance<IUser>({
				method: 'POST',
				url: '/auth/login',
				data: body,
			})
		).data;
	}
}

export const authService = new AuthService();
