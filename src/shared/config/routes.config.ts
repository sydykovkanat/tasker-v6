import { IHugeIcon } from '@/shared/types';

import {
	IconCalendar,
	IconChart,
	IconFolder,
	IconHome,
	IconTag,
	IconUsers,
} from '../components/shared/icons';

export interface IRoute {
	url: string;
	label: string;
	icon?: IHugeIcon;
}

export const routes: IRoute[] = [
	{
		url: '/',
		label: 'Все задачи',
		icon: IconHome,
	},
	{
		url: '/tasks/new',
		label: 'Новые',
	},
	{
		url: '/tasks/in-progress',
		label: 'В работе',
	},
	{
		url: '/tasks/completed',
		label: 'Завершенные',
	},
	{
		url: '/tasks/rejected',
		label: 'Отклоненные',
	},
	{
		url: '/projects',
		label: 'Проекты',
		icon: IconFolder,
	},
	{
		url: '/calendar',
		label: 'Календарь',
		icon: IconCalendar,
	},
	{
		url: '/subordinates',
		label: 'Сотрудники',
		icon: IconUsers,
	},
	{
		url: '/statistics',
		label: 'Статистика',
		icon: IconChart,
	},
	{
		url: '/tags',
		label: 'Теги',
		icon: IconTag,
	},
];
