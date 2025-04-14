import { useQuery } from '@tanstack/react-query';

import { statisticsService } from '@/features/statistics/services';

export function useGetMyStatistics() {
	const { data: myStatistics, isLoading: isMyStatisticsLoading } = useQuery({
		queryKey: ['statistics my'],
		queryFn: async () => statisticsService.getMyStatistics(),
	});

	return { myStatistics, isMyStatisticsLoading };
}
