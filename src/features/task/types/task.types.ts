import { IPerson } from '@/features/auth/types';
import { IDepartment } from '@/features/department/types';
import { IProject } from '@/features/project/types';

import { IFile, IPriority, IStatus } from '@/shared/types';

export interface ITask {
	id: number;
	taskName: string;
	description: string;
	author: IPerson;
	priorityOrder: number;
	performer: IPerson;
	departmentDto: IDepartment;
	createdDate: string;
	updatedDate: string;
	startDate: string;
	isView: boolean;
	endDate: Date;
	priority: IPriority;
	status: IStatus;
	files: IFile[];
	isTemplate: boolean;
	project: IProject | null;
	reason: string | null;
	rejectedDateTime: Date | null;
	rejectedAuthor: IPerson | null;
}
