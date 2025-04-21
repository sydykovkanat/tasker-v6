import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { taskService } from '@/features/task/services';

export function useEditTaskPriorityOrders() {
	const queryClient = useQueryClient();

	const {
		mutate: editTaskPriorityOrder,
		isPending: isEditTaskPriorityOrderLoading,
	} = useMutation({
		mutationKey: ['tasks edit priority'],
		mutationFn: async ({
			firstTaskId,
			secondTaskId,
		}: {
			firstTaskId: number;
			secondTaskId: number;
		}) => await taskService.editPriorityOrders(firstTaskId, secondTaskId),
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

	return { editTaskPriorityOrder, isEditTaskPriorityOrderLoading };
}
