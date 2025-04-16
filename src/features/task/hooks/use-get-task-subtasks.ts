import { useQuery } from '@tanstack/react-query';

import { taskService } from '@/features/task/services';

export function useGetTaskSubtasks(id: number) {
	const { data: subtasks, isLoading: isSubtasksLoading } = useQuery({
		queryKey: ['subtasks', id],
		queryFn: async () => await taskService.getTaskSubtasks(id),
	});

	return { subtasks, isSubtasksLoading };
}
