import { ITask } from '@/features/task/types';

export interface IApprove {
	id: number;
	task: ITask;
	isApprove: boolean | null;
	startDate: string;
	endDate: string;
	sendDate: string;
}
