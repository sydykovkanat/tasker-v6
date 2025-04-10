export function getDayDeclension(days: number): string {
	const absDays = Math.abs(days);
	const lastDigit = absDays % 10;
	const lastTwoDigits = absDays % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		return 'дней';
	}

	if (lastDigit === 1) {
		return 'день';
	}

	if (lastDigit >= 2 && lastDigit <= 4) {
		return 'дня';
	}

	return 'дней';
}
