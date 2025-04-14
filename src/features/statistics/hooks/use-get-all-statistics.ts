import { useQuery } from '@tanstack/react-query';

import { statisticsService } from '@/features/statistics/services';

export function useGetAllStatistics() {
	const { data: allStatistics, isLoading: isAllStatisticsLoading } = useQuery({
		queryKey: ['statistics all'],
		queryFn: async () => statisticsService.getAllStatistics(),
	});

	return { allStatistics, isAllStatisticsLoading };
}
