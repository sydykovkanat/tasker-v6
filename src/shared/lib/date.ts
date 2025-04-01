import { format } from 'date-fns';
import { FormatOptions } from 'date-fns/format';
import { ru } from 'date-fns/locale';

export const date = (
	date: string | Date,
	template = 'PPP',
	options: FormatOptions = {},
) => {
	return format(date, template, {
		...options,
		locale: ru,
	});
};
