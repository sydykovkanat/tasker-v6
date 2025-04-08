import { useQuery } from '@tanstack/react-query';

import { notificationService } from '@/features/notification/services';

export function useGetNotifications() {
	const { data: notifications, isLoading: isNotificationsLoading } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => await notificationService.getAll(),
		refetchInterval: 5000,
	});

	return { notifications, isNotificationsLoading };
}
