import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { tagService } from '@/features/tag/services';

export function useDeleteTag() {
	const queryClient = useQueryClient();

	const { mutate: deleteTag, isPending: isTagDeleteLoading } = useMutation({
		mutationKey: ['delete tag'],
		mutationFn: async (tagId: number) => await tagService.delete(tagId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['tags'] });
			toast.success('Тег успешно удален', {
				description: 'Тег был успешно удален',
			});
		},
		onError: () => {
			toast.error('Не удалось удалить тег', {
				description: 'Тег не был удален, попробуйте позже',
			});
		},
	});

	return { deleteTag, isTagDeleteLoading };
}
