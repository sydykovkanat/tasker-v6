import { ITask } from '@/features/task/types';

import { instance } from '@/shared/api';

class TaskService {
	public async getAll() {
		return (
			await instance<ITask[]>({
				method: 'GET',
				url: '/tasks',
			})
		).data;
	}
}

export const taskService = new TaskService();
