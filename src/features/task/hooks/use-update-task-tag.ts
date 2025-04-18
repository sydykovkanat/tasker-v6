import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { taskService } from '@/features/task/services';

export function useUpdateTaskTag() {
	const queryClient = useQueryClient();

	const { mutate: updateTag, isPending: isUpdateTagLoading } = useMutation({
		mutationKey: ['task tag'],
		mutationFn: async ({
			taskId,
			tagId,
		}: {
			taskId: number;
			tagId: number | null;
		}) => taskService.updateTag(taskId, tagId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['tasks'] });
			await queryClient.invalidateQueries({ queryKey: ['task'] });

			toast.success('Тег успешно добавлен к задаче', {
				description: 'Тег был успешно добавлен к задаче',
			});
		},
		onError: () => {
			toast.error('Ошибка при добавлении тега', {
				description: 'Не удалось добавить тег к задаче',
			});
		},
	});

	return { updateTag, isUpdateTagLoading };
}
