import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TaskSchemaType } from '@/features/task/schemas';
import { taskService } from '@/features/task/services';

export function useCreateSubtask(taskId: number) {
	const queryClient = useQueryClient();

	const { mutate: createSubtask, isPending: isCreateSubtaskLoading } =
		useMutation({
			mutationKey: ['subtasks create'],
			mutationFn: async (data: TaskSchemaType) =>
				await taskService.createSubtask(taskId, data),
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['subtasks', taskId] });

				toast.success('Подзадача успешно создана', {
					description:
						'Подзадача была успешно создана и добавлена в список подзадач',
				});
			},
			onError: () => {
				toast.error('Ошибка создания подзадачи', {
					description:
						'При создании подзадачи произошла ошибка. Попробуйте еще раз.',
				});
			},
		});

	return { createSubtask, isCreateSubtaskLoading };
}
