import { IDepartment } from '@/features/department/types';

export interface IProject {
	id: number;
	name: string;
	description: string;
	responsiblePersonName: string;
	department: IDepartment;
	createdAt: string;
	updatedAt: string;
}
