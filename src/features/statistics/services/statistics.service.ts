import { IStatistics } from '@/features/statistics/types';

import { instance } from '@/shared/api';

class StatisticsService {
	async getAllStatistics() {
		return (
			await instance<IStatistics[]>({
				url: '/profile/all-stats',
			})
		).data;
	}

	async getMyStatistics() {
		return (
			await instance<IStatistics>({
				url: '/profile/my-stats',
			})
		).data;
	}
}

export const statisticsService = new StatisticsService();
