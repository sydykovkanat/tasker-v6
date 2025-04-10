import { ISubordinates } from '@/features/subordinate/types';

import { instance } from '@/shared/api';

class SubordinateService {
	public async getAll(page?: number, keyword?: string, size?: number) {
		const safePage = Math.max(page ?? 0, 0);
		return (
			await instance<ISubordinates>({
				method: 'GET',
				url: '/users/subordinates',
				params: {
					page: safePage,
					size,
					keyword,
				},
			})
		).data;
	}
}

export const subordinateService = new SubordinateService();
