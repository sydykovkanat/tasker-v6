import { z } from 'zod';

export const TaskSchema = z.object({
	taskName: z
		.string({
			required_error: 'Введите название задачи',
		})
		.min(1, { message: 'Введите название задачи' }),
	description: z.string().min(1, { message: 'Введите описание задачи' }),
	priorityId: z
		.string()
		.min(1, { message: 'Выберите приоритет задачи' })
		.refine((value) => value !== 'undefined', {
			message: 'Нужно выбрать приоритет задачи',
		}),
	performerId: z.preprocess((val) => {
		if (typeof val === 'string' && val === 'undefined') return [];
		return val;
	}, z.array(z.string())),
	dates: z.object(
		{
			from: z.date({
				required_error: 'Выберите дату начала',
				invalid_type_error: 'Неверный формат даты начала',
			}),
			to: z.date({
				required_error: 'Выберите дату окончания',
				invalid_type_error: 'Неверный формат даты окончания',
			}),
		},
		{ message: 'Выберите даты' },
	),
	departmentId: z
		.string()
		.min(1, { message: 'Выберите отдел задачи' })
		.refine((value) => value !== 'undefined', {
			message: 'Нужно выбрать отдел задачи',
		}),
	projectId: z.string(),
});

export type TaskSchemaType = z.infer<typeof TaskSchema>;
