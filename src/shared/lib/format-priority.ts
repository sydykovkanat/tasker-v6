export function formatPriority(priority: number) {
	switch (priority) {
		case 1:
			return {
				value: 1,
				label: 'Низкий',
			};
		case 2:
			return {
				value: 2,
				label: 'Средний',
			};
		case 3:
			return {
				value: 3,
				label: 'Высокий',
			};
		default:
			return {
				value: 0,
				label: 'Неизвестно',
			};
	}
}
