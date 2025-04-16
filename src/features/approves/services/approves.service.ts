import { IApprove } from '@/features/approves/types';

import { instance } from '@/shared/api';

class ApprovesService {
	public async getAll() {
		return (
			await instance<IApprove[]>({
				method: 'GET',
				url: '/approves',
			})
		).data;
	}

	public async getCount() {
		return (
			await instance<number>({
				method: 'GET',
				url: '/approves/badges',
			})
		).data;
	}

	public async update(approveId: number, isApprove: boolean) {
		return (
			await instance<IApprove>({
				method: 'PUT',
				url: `/approves/${approveId}`,
				params: {
					approve: isApprove,
				},
			})
		).data;
	}
}

export const approvesService = new ApprovesService();
