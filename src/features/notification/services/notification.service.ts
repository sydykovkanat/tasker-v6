import { INotification } from '@/features/notification/types';

import { instance } from '@/shared/api';

class NotificationService {
	async getAll() {
		return (
			await instance<INotification[]>({
				method: 'GET',
				url: '/notifications',
			})
		).data;
	}
}

export const notificationService = new NotificationService();
