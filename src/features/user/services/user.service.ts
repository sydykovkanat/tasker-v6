import { IPerson } from '@/features/auth/types';

import { instance } from '@/shared/api';

class UserService {
	async getAll() {
		return (
			await instance<IPerson[]>({
				method: 'GET',
				url: '/users',
			})
		).data;
	}

	async getAllByDepartment(departmentId: string) {
		return (
			await instance<IPerson[]>({
				method: 'GET',
				url: '/users',
				params: {
					departmentId: departmentId !== 'undefined' ? departmentId : undefined,
				},
			})
		).data;
	}
}

export const userService = new UserService();
