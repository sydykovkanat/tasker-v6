import { INotification, NotificationType } from '@/features/notification/types';

interface Props {
	notification: INotification;
}

export function NotificationCard({ notification }: Props) {
	const formattedNotificationType =
		notification.notificationType === NotificationType.CHANGE_STATUS
			? 'Изменение статуса'
			: notification.notificationType === NotificationType.DELETE
				? 'Удаление'
				: notification.notificationType === NotificationType.CREATED_TASK
					? 'Создание задачи'
					: notification.notificationType === NotificationType.EDITED_TASK
						? 'Редактирование задачи'
						: notification.notificationType ===
							  NotificationType.STATUS_TASK_DONE
							? 'Завершение задачи'
							: 'Неизвестно';

	return (
		<div
			key={notification.id}
			className='border-b border-dashed p-4 last-of-type:border-0'
		>
			<h3 className='text-lg font-semibold'>{formattedNotificationType}</h3>

			<p>{notification.messageNotification}</p>
		</div>
	);
}
