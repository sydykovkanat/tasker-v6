import { useQuery } from '@tanstack/react-query';

import { tagService } from '@/features/tag/services';

export function useGetTags() {
	const { data: tags, isPending: isTagsLoading } = useQuery({
		queryKey: ['tags'],
		queryFn: () => tagService.getAll(),
	});

	return { tags, isTagsLoading };
}
