import { useQuery } from '@tanstack/react-query';

import { taskService } from '@/features/task/services';

export function useGetTaskById(id: number) {
	const { data: task, isLoading: isTaskLoading } = useQuery({
		queryKey: ['task', id],
		queryFn: async () => await taskService.getById(id),
	});

	return { task, isTaskLoading };
}
