import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { taskService } from '@/features/task/services';

export function useEditTaskPriority() {
	const queryClient = useQueryClient();

	const { mutate: editTaskPriority, isPending: isEditTaskPriorityLoading } =
		useMutation({
			mutationKey: ['tasks edit priority'],
			mutationFn: async ({
				taskId,
				priorityId,
			}: {
				taskId: number;
				priorityId: number;
			}) => await taskService.updatePriority(taskId, priorityId),
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['tasks'] });
				await queryClient.invalidateQueries({ queryKey: ['task'] });
				await queryClient.invalidateQueries({ queryKey: ['subtasks'] });

				toast.success('Приоритет успешно обновлен', {
					description: 'Приоритет задачи был успешно обновлен',
				});
			},
			onError: () => {
				toast.error('Ошибка обновления приоритета', {
					description:
						'При обновлении приоритета произошла ошибка. Попробуйте еще раз.',
				});
			},
		});

	return { editTaskPriority, isEditTaskPriorityLoading };
}
