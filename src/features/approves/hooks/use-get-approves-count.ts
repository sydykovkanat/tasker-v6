import { useQuery } from '@tanstack/react-query';

import { approvesService } from '@/features/approves/services';

export function useGetApprovesCount() {
	const { data: approvesCount, isPending: isLoadingApprovesCount } = useQuery({
		queryKey: ['approves count'],
		queryFn: async () => approvesService.getCount(),
		refetchInterval: 10000,
	});

	return { approvesCount, isLoadingApprovesCount };
}
