import { useQuery } from '@tanstack/react-query';

import { taskService } from '@/features/task/services';

export function useGetTasks(
	statusId?: number,
	projectId?: number,
	performerId?: number,
	departmentId?: number,
) {
	const { data: tasks, isLoading: isTasksLoading } = useQuery({
		queryKey: ['tasks', statusId, projectId, performerId, departmentId],
		queryFn: async () =>
			await taskService.getAll(statusId, projectId, performerId, departmentId),
	});

	return { tasks, isTasksLoading };
}
