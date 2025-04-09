import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TaskSchemaType } from '@/features/task/schemas';
import { taskService } from '@/features/task/services';

export function useCreateTask() {
	const queryClient = useQueryClient();

	const { mutate: createTask, isPending: isCreateTaskLoading } = useMutation({
		mutationKey: ['tasks create'],
		mutationFn: async (data: TaskSchemaType) => await taskService.create(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['tasks'] });

			toast.success('Задача успешно создана', {
				description: 'Задача была успешно создана и добавлена в список задач',
			});
		},
		onError: () => {
			toast.error('Ошибка создания задачи', {
				description:
					'При создании задачи произошла ошибка. Попробуйте еще раз.',
			});
		},
	});

	return { createTask, isCreateTaskLoading };
}
