import { IHistory } from '@/features/history/types';

import { instance } from '@/shared/api';

class HistoryService {
	public async getTaskHistoryById(id: number) {
		return (
			await instance<IHistory[]>({
				method: 'GET',
				url: `/task/${id}/histories`,
			})
		).data;
	}
}

export const historyService = new HistoryService();
