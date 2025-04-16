import { TagSchemaType } from '@/features/tag/schemas';
import { ITag } from '@/features/tag/types';

import { instance } from '@/shared/api';

class TagService {
	public async getAll() {
		return (
			await instance<ITag[]>({
				method: 'GET',
				url: '/tags',
			})
		).data;
	}

	public async create(data: TagSchemaType) {
		return (
			await instance<ITag>({
				method: 'POST',
				url: '/tags',
				data,
			})
		).data;
	}

	public async delete(id: number) {
		return (
			await instance<ITag>({
				method: 'DELETE',
				url: `/tags/${id}`,
			})
		).data;
	}
}

export const tagService = new TagService();
