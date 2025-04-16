import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { taskService } from '@/features/task/services';

export function useEditTaskDates() {
	const { mutate: updateTaskDates, isPending: isUpdateTaskDatesLoading } =
		useMutation({
			mutationKey: ['edit task dates'],
			mutationFn: async ({
				taskId,
				dates,
			}: {
				taskId: number;
				dates: { from: Date; to: Date };
			}) => taskService.updateDates(taskId, { from: dates.from, to: dates.to }),
			onSuccess: () => {
				toast.success('Успешно изменено', {
					description: 'Сроки выполнения задачи отправлены на рассмотрение',
				});
			},
			onError: () => {
				toast.error('Ошибка при изменении сроков', {
					description: 'Не удалось изменить сроки выполнения задачи',
				});
			},
		});

	return { updateTaskDates, isUpdateTaskDatesLoading };
}
