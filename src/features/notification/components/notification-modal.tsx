import { PropsWithChildren } from 'react';

import { NotificationCard } from '@/features/notification/components/notification-card';
import { useGetNotifications } from '@/features/notification/hooks';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	ScrollArea,
} from '@/shared/components/ui';

export function NotificationModal({ children }: PropsWithChildren) {
	const { isNotificationsLoading, notifications } = useGetNotifications();

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className={'sm:max-w-2xl'}>
				<DialogHeader>
					<DialogTitle className={'flex items-start gap-x-2'}>
						<span>Уведомления</span>

						{notifications && (
							<span className={'text-muted-foreground text-sm'}>
								({notifications.length})
							</span>
						)}
					</DialogTitle>
					<DialogDescription>
						Список уведомлений, которые вы получили. После закрытия окна
						уведомления станут прочитанными и удалятся из списка.
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className={'h-[600px]'}>
					<div className='flex flex-col gap-4'>
						{isNotificationsLoading ? (
							<p>Loading...</p>
						) : notifications?.length ? (
							notifications.map((notification) => (
								<NotificationCard notification={notification} />
							))
						) : (
							<p>No notifications</p>
						)}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
