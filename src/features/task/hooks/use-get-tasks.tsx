import { useQuery } from '@tanstack/react-query';

import { taskService } from '@/features/task/services';

export function useGetTasks(status?: number) {
	const { data: tasks, isLoading: isTasksLoading } = useQuery({
		queryKey: ['tasks', status],
		queryFn: async () => await taskService.getAll(status),
	});

	return { tasks, isTasksLoading };
}
