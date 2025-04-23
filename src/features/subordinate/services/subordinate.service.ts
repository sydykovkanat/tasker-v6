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

	public async editAvatar(subordinateId: number, avatar: File): Promise<void> {
		const formData = new FormData();
		formData.append('avatar', avatar);

		await instance({
			url: `/users/${subordinateId}`,
			method: 'PUT',
			data: formData,
		});
	}
}

export const subordinateService = new SubordinateService();
