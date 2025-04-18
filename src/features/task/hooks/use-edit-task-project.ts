import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { taskService } from '@/features/task/services';

export function useEditTaskProject() {
	const queryClient = useQueryClient();

	const { mutate: editProject, isPending: isEditTaskProjectLoading } =
		useMutation({
			mutationKey: ['task project'],
			mutationFn: async ({
				taskId,
				projectId,
			}: {
				taskId: number;
				projectId: number | null;
			}) => taskService.editProject(taskId, projectId),
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['tasks'] });
				await queryClient.invalidateQueries({ queryKey: ['task'] });

				toast.success('Проект успешно обновлён у задачи', {
					description: 'Проект был успешно обновлён у задачи',
				});
			},
			onError: () => {
				toast.error('Ошибка при обновлении проекта задачи', {
					description: 'Не удалось обновить проект у задачи',
				});
			},
		});

	return { editProject, isEditTaskProjectLoading };
}
