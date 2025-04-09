import { ITask } from '@/features/task/types';

export interface IHistory {
	id: number;
	task: ITask;
	changeUserId: number;
	changeUserName: string;
	changeUserAvatar: string;
	fieldName: string;
	newValue: string;
	oldValue: string;
	changeReason: string;
	createdAt: string;
}
