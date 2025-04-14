import { PropsWithChildren } from 'react';

import { useAuthStore } from '@/features/auth/store';
import { DeleteTaskModal } from '@/features/task/components/delete-task-modal';
import { useEditTaskPriority, useEditTaskStatus } from '@/features/task/hooks';
import { ITask } from '@/features/task/types';

import {
	IconCircle,
	IconCircleArrowDataTransferHorizontal,
	IconCircleArrowDataTransferVertical,
	IconCircleArrowDown,
	IconCircleArrowRight,
	IconCircleArrowUp,
	IconDelete,
} from '@/shared/components/shared';
import {
	Button,
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from '@/shared/components/ui';

interface Props {
	task: ITask;
}

export function TaskMenu({ task, children }: PropsWithChildren<Props>) {
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
			<ContextMenuTrigger asChild disabled={!isAccess}>
				{children}
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuSub>
					<ContextMenuSubTrigger className={'flex items-center gap-x-2'}>
						<IconCircleArrowDataTransferHorizontal
							className={'text-muted-foreground'}
						/>
						Статус
					</ContextMenuSubTrigger>
					<ContextMenuSubContent className='w-48'>
						{!isNew && !isCompleted && (
							<ContextMenuItem
								disabled={isEditTaskStatusLoading}
								onClick={() => editTaskStatus(1)}
							>
								<IconCircleArrowUp />
								Перевести в новое
							</ContextMenuItem>
						)}

						{!isProgress && (
							<ContextMenuItem
								disabled={isEditTaskStatusLoading}
								onClick={() => editTaskStatus(2)}
							>
								<IconCircleArrowRight />
								Перевести в работу
							</ContextMenuItem>
						)}

						{!isCompleted && (
							<ContextMenuItem
								disabled={isEditTaskStatusLoading}
								onClick={() => editTaskStatus(3)}
							>
								<IconCircleArrowDown />
								Завершить задачу
							</ContextMenuItem>
						)}
					</ContextMenuSubContent>
				</ContextMenuSub>

				{!isCompleted && (
					<ContextMenuSub>
						<ContextMenuSubTrigger className={'flex items-center gap-x-2'}>
							<IconCircleArrowDataTransferVertical
								className={'text-muted-foreground'}
							/>
							Изменить приоритет
						</ContextMenuSubTrigger>
						<ContextMenuSubContent>
							{!isLow && (
								<ContextMenuItem
									disabled={isEditTaskPriorityLoading}
									onClick={() => editTaskPriority(1)}
								>
									<IconCircle className={'text-green-500'} />
									Приоритет
								</ContextMenuItem>
							)}

							{!isMiddle && (
								<ContextMenuItem
									disabled={isEditTaskPriorityLoading}
									onClick={() => editTaskPriority(2)}
								>
									<IconCircle className={'text-yellow-500'} />
									Средний приоритет
								</ContextMenuItem>
							)}

							{!isHigh && (
								<ContextMenuItem
									disabled={isEditTaskPriorityLoading}
									onClick={() => editTaskPriority(3)}
								>
									<IconCircle className={'text-red-500'} />
									Высокий приоритет
								</ContextMenuItem>
							)}
						</ContextMenuSubContent>
					</ContextMenuSub>
				)}

				{!isCompleted && (
					<DeleteTaskModal taskId={task.id}>
						<Button
							variant={'ghost'}
							size={'sm'}
							className={'w-full justify-start font-normal'}
						>
							<IconDelete className={'text-muted-foreground'} />
							Удалить
						</Button>
					</DeleteTaskModal>
				)}
			</ContextMenuContent>
		</ContextMenu>
	);
}
