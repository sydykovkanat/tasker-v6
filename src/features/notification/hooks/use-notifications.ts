import notificationSound from '/notification.mp3';
import { Client } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthStore } from '@/features/auth/store';

import { WS_URL } from '@/shared/constants';

export function useNotifications() {
	const user = useAuthStore((state) => state.user);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!user?.token) return;

		const audio = new Audio(notificationSound);
		audio.volume = 0.5;

		const stompClient = new Client({
			brokerURL: WS_URL,
			reconnectDelay: 5000,
			onConnect: () => {
				stompClient.subscribe(
					`/user/${user.token}/queue/messages`,
					(message) => {
						try {
							const parsedMessage = JSON.parse(message.body);
							const type =
								parsedMessage.notificationType === 'DELETE'
									? 'Удалено'
									: parsedMessage.notificationType === 'EDITED_TASK'
										? 'Изменено'
										: parsedMessage.notificationType === 'CHANGE_STATUS'
											? 'Изменен статус'
											: 'Добавлено';

							void audio.play();

							queryClient.invalidateQueries({ queryKey: ['tasks'] });
							queryClient.invalidateQueries({ queryKey: ['task'] });
							queryClient.invalidateQueries({ queryKey: ['subtasks'] });

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
						} catch (error) {
							console.error('Ошибка обработки уведомления:', error);
						}
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
