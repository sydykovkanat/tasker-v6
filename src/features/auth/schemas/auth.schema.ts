import { z } from 'zod';

import { REQUIRED_FIELD } from '@/shared/config';

export const AuthSchema = z.object({
	email: z
		.string()
		.min(1, { message: REQUIRED_FIELD })
		.email({ message: 'Неверный формат почты' })
		.refine((email) => email.endsWith('@shoro.kg'), {
			message: 'Почта должна быть в формате @shoro.kg',
		}),
	password: z
		.string()
		.min(6, { message: 'Пароль должен содержать не менее 6 символов' }),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
