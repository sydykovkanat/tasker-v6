import { ProjectSchemaType } from '@/features/project/schemas';
import { IProject } from '@/features/project/types';

import { instance } from '@/shared/api';

class ProjectService {
	public async getAll() {
		return (
			await instance<IProject[]>({
				method: 'GET',
				url: '/projects',
			})
		).data;
	}

	public async create(body: ProjectSchemaType) {
		return (
			await instance<IProject>({
				method: 'POST',
				url: '/projects',
				data: body,
			})
		).data;
	}
}

export const projectService = new ProjectService();
