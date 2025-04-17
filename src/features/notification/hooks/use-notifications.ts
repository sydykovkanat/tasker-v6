import { Client } from '@stomp/stompjs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthStore } from '@/features/auth/store';

import { WS_URL } from '@/shared/constants';

export function useNotifications() {
	const user = useAuthStore((state) => state.user);
	const navigate = useNavigate();

	console.log(user);

	useEffect(() => {
		const stompClient = new Client({
			brokerURL: WS_URL,
			reconnectDelay: 5000,
			onConnect: () => {
				stompClient.subscribe(
					`/user/${user?.token}/queue/messages`,
					function (message) {
						console.log(message);
						const parsedMessage = JSON.parse(message.body);
						const type =
							parsedMessage.notificationType === 'DELETE'
								? 'Удалено'
								: parsedMessage.notificationType === 'EDITED_TASK'
									? 'Изменено'
									: parsedMessage.notificationType === 'CHANGE_STATUS'
										? 'Изменен статус'
										: 'Добавлено';
						toast.message(type, {
							description: parsedMessage.messageNotification,
							className: 'line-clamp-1',
							position: 'top-right',
							action: {
								label: 'Посмотреть',
								onClick: () => {
									navigate(`/tasks/${parsedMessage.task.id}`);
								},
							},
						});
					},
				);
			},
			onStompError: (frame) => {
				console.error('Broker reported error: ' + frame.headers['message']);
				console.error('Additional details: ' + frame.body);
				toast.error('Ошибка подключения к WebSocket');
			},
		});

		stompClient.activate();

		return () => {
			if (stompClient) {
				void stompClient.deactivate();
			}
		};
	}, [navigate, user?.token]);
}
