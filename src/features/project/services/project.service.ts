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

	public async update(projectId: number, body: ProjectSchemaType) {
		return (
			await instance<IProject>({
				method: 'PUT',
				url: `/projects/${projectId}`,
				data: body,
			})
		).data;
	}

	public async delete(projectId: number) {
		await instance<IProject>({
			method: 'DELETE',
			url: `/projects/${projectId}`,
		});
	}
}

export const projectService = new ProjectService();
