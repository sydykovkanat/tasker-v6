import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TaskSchemaType } from '@/features/task/schemas';
import { taskService } from '@/features/task/services';

export function useEditTask(taskId: number) {
	const queryClient = useQueryClient();

	const { mutate: editTask, isPending: isEditTaskLoading } = useMutation({
		mutationKey: ['tasks edit'],
		mutationFn: async (data: TaskSchemaType) =>
			await taskService.edit(taskId, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['tasks'] });
			await queryClient.invalidateQueries({ queryKey: ['task', taskId] });

			toast.success('Задача успешно обновлена', {
				description: 'Задача была успешно обновлена',
			});
		},
		onError: () => {
			toast.error('Ошибка обновления задачи', {
				description:
					'При обновлении задачи произошла ошибка. Попробуйте еще раз.',
			});
		},
	});

	return { editTask, isEditTaskLoading };
}
