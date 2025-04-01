import { useQuery } from '@tanstack/react-query';

import { taskService } from '@/features/task/services';

export function useGetTasks() {
	const { data: tasks, isLoading: isTasksLoading } = useQuery({
		queryKey: ['tasks'],
		queryFn: async () => await taskService.getAll(),
	});

	return { tasks, isTasksLoading };
}
