import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { taskService } from '@/features/task/services';

export function useEditTaskDepartment() {
	const queryClient = useQueryClient();

	const { mutate: editDepartment, isPending: isEditDepartmentTaskLoading } =
		useMutation({
			mutationKey: ['tasks edit department'],
			mutationFn: async ({
				taskId,
				departmentId,
				reason,
			}: {
				taskId: number;
				departmentId: number;
				reason: string;
			}) => await taskService.editDepartment(taskId, departmentId, reason),
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['tasks'] });
				await queryClient.invalidateQueries({ queryKey: ['subtasks'] });
				await queryClient.invalidateQueries({ queryKey: ['task'] });

				toast.success('Департамент задачи изменён', {
					description: 'Департамент задачи успешно изменён',
				});
			},
			onError: () => {
				toast.error('Ошибка изменении департамента', {
					description:
						'При изменении департамента произошла ошибка. Попробуйте еще раз.',
				});
			},
		});

	return { editDepartment, isEditDepartmentTaskLoading };
}
