import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { taskService } from '@/features/task/services';

export function useDeleteTask() {
	const queryClient = useQueryClient();

	const { mutate: deleteTask, isPending: isDeleteTaskLoading } = useMutation({
		mutationKey: ['tasks delete'],
		mutationFn: async (taskId: number) => await taskService.delete(taskId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['tasks'] });

			toast.success('Задача успешно удалена', {
				description: 'Задача была успешно удалена из списка задач',
			});
		},
		onError: () => {
			toast.error('Ошибка удаления задачи', {
				description:
					'При удалении задачи произошла ошибка. Попробуйте еще раз.',
			});
		},
	});

	return { deleteTask, isDeleteTaskLoading };
}
