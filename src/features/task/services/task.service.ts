import { TaskSchemaType } from '@/features/task/schemas';
import { ITask } from '@/features/task/types';

import { instance } from '@/shared/api';

class TaskService {
	public async getAll(
		statusId?: number,
		projectId?: number,
		performerId?: number,
	) {
		return (
			await instance<ITask[]>({
				method: 'GET',
				url: '/tasks',
				params: {
					statusId,
					projectId,
					performerId,
				},
			})
		).data;
	}

	public async getById(id: number) {
		return (
			await instance<ITask>({
				method: 'GET',
				url: `/tasks/${id}`,
			})
		).data;
	}

	public async create(data: TaskSchemaType) {
		const formData = new FormData();

		formData.append('taskName', data.taskName);
		formData.append('description', data.description);
		formData.append('priorityId', data.priorityId);
		if (
			data.performerId &&
			data.performerId?.length > 0 &&
			data.performerId[0] !== 'undefined'
		) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			formData.append('performerId', data.performerId);
		}
		formData.append('departmentId', data.departmentId);
		if (data.projectId !== 'undefined') {
			formData.append('projectId', data.projectId);
		}
		formData.append('startDate', data.dates.from.toString());
		formData.append('endDate', data.dates.to.toString());

		return (
			await instance<ITask>({
				method: 'POST',
				url: '/tasks',
				data: formData,
			})
		).data;
	}

	public async edit(id: number, data: TaskSchemaType) {
		const formData = new FormData();

		formData.append('taskName', data.taskName);
		formData.append('description', data.description);
		formData.append('priorityId', data.priorityId);
		if (
			data.performerId &&
			data.performerId?.length > 0 &&
			data.performerId[0] !== 'undefined'
		) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			formData.append('performerId', data.performerId);
		}
		formData.append('departmentId', data.departmentId);
		if (data.projectId !== 'undefined') {
			formData.append('projectId', data.projectId);
		}
		formData.append('startDate', data.dates.from.toString());
		formData.append('endDate', data.dates.to.toString());

		return (
			await instance<ITask>({
				method: 'PUT',
				url: `/tasks/${id}`,
				data: formData,
			})
		).data;
	}

	public async delete(id: number) {
		return (
			await instance({
				method: 'DELETE',
				url: `/tasks/${id}`,
			})
		).data;
	}

	public async updateStatus(id: number, statusId: number) {
		return (
			await instance({
				method: 'PATCH',
				url: `/tasks/${id}`,
				params: {
					statusId,
				},
			})
		).data;
	}

	public async updatePriority(id: number, priorityId: number) {
		return (
			await instance({
				method: 'PATCH',
				url: `/tasks/${id}/priority`,
				data: {
					priorityId,
				},
			})
		).data;
	}
}

export const taskService = new TaskService();
