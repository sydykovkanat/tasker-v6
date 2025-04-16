import { IDepartment } from '@/features/department/types';

export interface ITag {
	id: number;
	name: string;
	description: string;
	department: IDepartment;
}
