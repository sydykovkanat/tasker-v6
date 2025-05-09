import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { taskService } from '@/features/task/services';

export function useEditTaskStatus() {
	const queryClient = useQueryClient();

	const { mutate: editTaskStatus, isPending: isEditTaskStatusLoading } =
		useMutation({
			mutationKey: ['tasks edit status'],
			mutationFn: async ({
				taskId,
				statusId,
			}: {
				taskId: number;
				statusId: number;
			}) => await taskService.updateStatus(taskId, statusId),
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['tasks'] });
				await queryClient.invalidateQueries({ queryKey: ['task'] });
				await queryClient.invalidateQueries({ queryKey: ['subtasks'] });

				toast.success('Статус успешно обновлен', {
					description: 'Статус задачи был успешно обновлен',
				});
			},
			onError: () => {
				toast.error('Ошибка обновления статуса', {
					description:
						'При обновлении статуса произошла ошибка. Попробуйте еще раз.',
				});
			},
		});

	return { editTaskStatus, isEditTaskStatusLoading };
}
