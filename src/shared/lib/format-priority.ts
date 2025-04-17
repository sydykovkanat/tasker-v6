export function formatPriority(priority: number) {
	switch (priority) {
		case 1:
			return {
				value: 1,
				label: 'Низкий',
				color: 'green',
			};
		case 2:
			return {
				value: 2,
				label: 'Средний',
				color: 'yellow',
			};
		case 3:
			return {
				value: 3,
				label: 'Высокий',
				color: 'red',
			};
		default:
			return {
				value: 0,
				label: 'Неизвестно',
				color: 'gray',
			};
	}
}
