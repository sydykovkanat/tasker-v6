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
}

export const projectService = new ProjectService();
