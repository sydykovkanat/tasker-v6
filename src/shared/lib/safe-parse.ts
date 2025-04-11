export const safeParse = (value: string | undefined | number) => {
	if (value && !isNaN(Number(value))) {
		return Number(value);
	}

	return undefined;
};
