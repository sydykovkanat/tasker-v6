import { IPerson } from '@/features/auth/types';

import { IPagination } from '@/shared/types';

export type ISubordinates = IPagination<ISubordinate>;

export interface ISubordinate extends IPerson {
	email: string;
	departmentName: string;
}
