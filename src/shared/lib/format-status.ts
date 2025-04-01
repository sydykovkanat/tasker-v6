export function formatStatus(status: number) {
	switch (status) {
		case 1:
			return { value: 1, label: 'Новый' };
		case 2:
			return { value: 2, label: 'В работе' };
		case 3:
			return { value: 3, label: 'Завершен' };
		case 4:
			return { value: 4, label: 'Отклонен' };
		default:
			return { value: 0, label: 'Неизвестный статус' };
	}
}
