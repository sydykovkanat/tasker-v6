import { useQuery } from '@tanstack/react-query';

import { approvesService } from '@/features/approves/services';

export function useGetApproves() {
	const { data: approves, isPending: isLoadingApproves } = useQuery({
		queryKey: ['approves'],
		queryFn: async () => approvesService.getAll(),
		refetchInterval: 10000,
	});

	return { approves, isLoadingApproves };
}
