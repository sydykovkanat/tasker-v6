import { useQuery } from '@tanstack/react-query';

import { subordinateService } from '@/features/subordinate/services';

export function useGetSubordinates(page: number, size = 18, keyword?: string) {
	const {
		data: subordinates,
		isLoading: isSubordinatesLoading,
		isError,
	} = useQuery({
		queryKey: ['subordinates', page, keyword],
		queryFn: async () => await subordinateService.getAll(page, keyword, size),
	});

	return {
		subordinates: subordinates ?? {
			content: [],
			totalPages: 0,
			first: true,
			last: true,
			numberOfElements: 0,
		},
		isSubordinatesLoading,
		isError,
	};
}
