import { IPerson } from '@/features/auth/types';
import { IDepartment } from '@/features/department/types';
import { IProject } from '@/features/project/types';
import { ITag } from '@/features/tag/types';

import { IFile, IPriority, IStatus } from '@/shared/types';

export interface ITask {
	id: number;
	taskName: string;
	description: string;
	author: IPerson;
	priorityOrder: number | null;
	performer: IPerson;
	departmentDto: IDepartment;
	createdDate: string;
	updatedDate: string;
	startDate: string;
	isView: boolean;
	endDate: string;
	priority: IPriority;
	status: IStatus;
	files: IFile[];
	isTemplate: boolean;
	project: IProject | null;
	reason: string | null;
	rejectedDateTime: string | null;
	rejectedAuthor: IPerson | null;
	tagDto: ITag | null;
}
