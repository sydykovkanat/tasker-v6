export const safeParse = (value: string | undefined) => {
	if (value && !isNaN(Number(value))) {
		return Number(value);
	}

	return undefined;
};
