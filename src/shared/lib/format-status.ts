export function formatStatus(status: number) {
	switch (status) {
		case 1:
			return { value: 1, label: 'Новый', color: 'blue' };
		case 2:
			return { value: 2, label: 'В работе', color: 'yellow' };
		case 3:
			return { value: 3, label: 'Завершен', color: 'green' };
		case 4:
			return { value: 4, label: 'Отклонен', color: 'red' };
		default:
			return { value: 0, label: 'Неизвестный статус', color: 'gray' };
	}
}
