import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { approvesService } from '@/features/approves/services';

export function useUpdateApprove() {
	const queryClient = useQueryClient();

	const { mutate: updateApprove, isPending: isUpdateApproveLoading } =
		useMutation({
			mutationKey: ['update approve'],
			mutationFn: async ({
				approveId,
				isApprove,
			}: {
				approveId: number;
				isApprove: boolean;
			}) => await approvesService.update(approveId, isApprove),
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['approves'] });
				await queryClient.invalidateQueries({ queryKey: ['tasks'] });
				await queryClient.invalidateQueries({ queryKey: ['task'] });

				toast.success('Согласование обновлено', {
					description: 'Согласование успешно согласовано',
				});
			},
			onError: () => {
				toast.error('Ошибка отклонения согласования', {
					description: 'Не удалось отклонить согласование',
				});
			},
		});

	return { updateApprove, isUpdateApproveLoading };
}
