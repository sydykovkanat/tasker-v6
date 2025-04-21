import { TaskSchemaType } from '@/features/task/schemas';
import { ITask } from '@/features/task/types';

import { instance } from '@/shared/api';

class TaskService {
	private buildFormData(data: TaskSchemaType): FormData {
		const formData = new FormData();

		formData.append('taskName', data.taskName);
		formData.append('description', data.description);
		formData.append('priorityId', data.priorityId);

		if (
			data.performerId &&
			data.performerId.length > 0 &&
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

		return formData;
	}

	public async getAll(
		statusId?: number,
		projectId?: number,
		performerId?: number,
		departmentId?: number,
	): Promise<ITask[]> {
		return (
			await instance<ITask[]>({
				method: 'GET',
				url: '/tasks',
				params: {
					statusId,
					projectId,
					performerId,
					departmentId,
				},
			})
		).data;
	}

	public async getTaskSubtasks(taskId: number): Promise<ITask[]> {
		return (
			await instance<ITask[]>({
				method: 'GET',
				url: `/tasks/${taskId}/subtasks`,
			})
		).data;
	}

	public async getById(id: number): Promise<ITask> {
		return (
			await instance<ITask>({
				method: 'GET',
				url: `/tasks/${id}`,
			})
		).data;
	}

	public async create(data: TaskSchemaType): Promise<ITask> {
		const formData = this.buildFormData(data);
		return (
			await instance<ITask>({
				method: 'POST',
				url: '/tasks',
				data: formData,
			})
		).data;
	}

	public async createSubtask(
		taskId: number,
		data: TaskSchemaType,
	): Promise<ITask> {
		const formData = this.buildFormData(data);
		return (
			await instance<ITask>({
				method: 'POST',
				url: `/tasks/${taskId}/subtasks`,
				data: formData,
			})
		).data;
	}

	public async edit(id: number, data: TaskSchemaType): Promise<ITask> {
		const formData = this.buildFormData(data);
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

	public async updateTag(taskId: number, tagId: number | null) {
		return (
			await instance({
				method: 'PATCH',
				url: `/tasks/${taskId}/tags`,
				data: {
					tagId,
				},
			})
		).data;
	}

	public async updateDates(taskId: number, dates: { from: Date; to: Date }) {
		return (
			await instance({
				method: 'PUT',
				url: `/tasks/${taskId}/date`,
				data: {
					startDate: dates.from,
					endDate: dates.to,
				},
			})
		).data;
	}

	public async editProject(taskId: number, projectId: number | null) {
		return (
			await instance({
				method: 'PATCH',
				url: `/tasks/${taskId}/projects`,
				data: {
					projectId,
				},
			})
		).data;
	}

	public async editDepartment(
		taskId: number,
		departmentId: number,
		reason: string,
	) {
		return (
			await instance({
				method: 'PATCH',
				url: `/tasks/${taskId}/performer`,
				data: {
					departmentId,
					reason,
				},
			})
		).data;
	}
}

export const taskService = new TaskService();
