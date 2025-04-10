import { PropsWithChildren } from 'react';

import { useAuthStore } from '@/features/auth/store';
import {
	useDeleteTask,
	useEditTaskPriority,
	useEditTaskStatus,
} from '@/features/task/hooks';
import { ITask } from '@/features/task/types';

import { IconDelete } from '@/shared/components/shared';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/shared/components/ui';

interface Props {
	task: ITask;
}

export function TaskMenu({ task, children }: PropsWithChildren<Props>) {
	const { deleteTask, isDeleteTaskLoading } = useDeleteTask();
	const { editTaskStatus, isEditTaskStatusLoading } = useEditTaskStatus(
		task.id,
	);
	const { editTaskPriority, isEditTaskPriorityLoading } = useEditTaskPriority(
		task.id,
	);

	const user = useAuthStore((state) => state.user);
	const isAccess =
		task.performer.id === user?.id ||
		task.author.id === user?.id ||
		user?.roles.includes('ADMIN');
	const isCompleted = task.status.id === 3;
	const isProgress = task.status.id === 2;
	const isNew = task.status.id === 1;
	const isLow = task.priority.id === 1;
	const isMiddle = task.priority.id === 2;
	const isHigh = task.priority.id === 3;

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				{!isNew && !isCompleted && (
					<ContextMenuItem
						disabled={isEditTaskStatusLoading}
						onClick={() => editTaskStatus(1)}
					>
						<svg />
						Перевести в новое
					</ContextMenuItem>
				)}

				{!isProgress && (
					<ContextMenuItem
						disabled={isEditTaskStatusLoading}
						onClick={() => editTaskStatus(2)}
					>
						<svg />
						Перевести в работу
					</ContextMenuItem>
				)}

				{!isCompleted && (
					<ContextMenuItem
						disabled={isEditTaskStatusLoading}
						onClick={() => editTaskStatus(3)}
					>
						<svg />
						Завершить задачу
					</ContextMenuItem>
				)}

				{!isLow && (
					<ContextMenuItem
						disabled={isEditTaskPriorityLoading}
						onClick={() => editTaskPriority(1)}
					>
						<svg />
						Низкий приоритет
					</ContextMenuItem>
				)}

				{!isMiddle && (
					<ContextMenuItem
						disabled={isEditTaskPriorityLoading}
						onClick={() => editTaskPriority(2)}
					>
						<svg />
						Средний приоритет
					</ContextMenuItem>
				)}

				{!isHigh && (
					<ContextMenuItem
						disabled={isEditTaskPriorityLoading}
						onClick={() => editTaskPriority(3)}
					>
						<svg />
						Высокий приоритет
					</ContextMenuItem>
				)}

				{isAccess && !isCompleted && (
					<ContextMenuItem
						onClick={() => deleteTask(task.id)}
						disabled={isDeleteTaskLoading}
					>
						<IconDelete />
						Удалить
					</ContextMenuItem>
				)}
			</ContextMenuContent>
		</ContextMenu>
	);
}
