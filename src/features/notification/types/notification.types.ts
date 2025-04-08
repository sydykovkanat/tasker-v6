import { IPerson } from '@/features/auth/types';
import { ITask } from '@/features/task/types';

export interface INotification {
	id: number;
	messageNotification: string;
	user: IPerson & { email: string; departmentName: string };
	task: ITask;
	sendDate: string;
	initiator: IPerson;
	notificationType: NotificationType;
}

export enum NotificationType {
	CHANGE_STATUS = 'CHANGE_STATUS',
	DELETE = 'DELETE',
	CREATED_TASK = 'CREATED_TASK',
	EDITED_TASK = 'EDITED_TASK',
	STATUS_TASK_DONE = 'STATUS_TASK_DONE',
}
