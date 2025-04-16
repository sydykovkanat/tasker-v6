import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TagSchemaType } from '@/features/tag/schemas';
import { tagService } from '@/features/tag/services';

export function useCreateTag() {
	const queryClient = useQueryClient();

	const { mutate: createTag, isPending: isTagCreateLoading } = useMutation({
		mutationKey: ['create tag'],
		mutationFn: async (body: TagSchemaType) => await tagService.create(body),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['tags'] });
			toast.success('Тег успешно создан', {
				description: 'Новый тег был успешно создан',
			});
		},
		onError: () => {
			toast.error('Не удалось создать тег', {
				description: 'Тег не был создан, попробуйте позже',
			});
		},
	});

	return { createTag, isTagCreateLoading };
}
