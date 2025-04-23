import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { subordinateService } from '@/features/subordinate/services';

export function useEditSubordinateAvatar() {
	const queryClient = useQueryClient();

	const { mutate: editAvatar, isPending: isEditAvatarLoading } = useMutation({
		mutationKey: ['edit subordinate avatar'],
		mutationFn: async ({
			subordinateId,
			avatar,
		}: {
			subordinateId: number;
			avatar: File;
		}) => await subordinateService.editAvatar(subordinateId, avatar),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['subordinates'] });

			toast.success('Аватар успешно изменён', {
				description: 'Аватар пользователя успешно изменён',
			});
		},
		onError: () => {
			toast.error('Не удалось изменить аватар', {
				description: 'Попробуйте ещё раз',
			});
		},
	});

	return { editAvatar, isEditAvatarLoading };
}
