import { PropsWithChildren } from 'react';

import { useAuthStore } from '@/features/auth/store';
import { useGetTags } from '@/features/tag/hooks';
import { DeleteTaskModal } from '@/features/task/components';
import { EditTaskDatesModal } from '@/features/task/components/edit-task-dates-modal';
import {
	useEditTaskPriority,
	useEditTaskStatus,
	useUpdateTaskTag,
} from '@/features/task/hooks';
import { ITask } from '@/features/task/types';

import {
	IconCalendar,
	IconCancel,
	IconCircle,
	IconCircleArrowDataTransferHorizontal,
	IconCircleArrowDataTransferVertical,
	IconCircleArrowDown,
	IconCircleArrowRight,
	IconCircleArrowUp,
	IconDelete,
	IconTag,
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
	const { tags, isTagsLoading } = useGetTags();
	const { updateTag, isUpdateTagLoading } = useUpdateTaskTag();

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
									Низкий
								</ContextMenuItem>
							)}

							{!isMiddle && (
								<ContextMenuItem
									disabled={isEditTaskPriorityLoading}
									onClick={() => editTaskPriority(2)}
								>
									<IconCircle className={'text-yellow-500'} />
									Средний
								</ContextMenuItem>
							)}

							{!isHigh && (
								<ContextMenuItem
									disabled={isEditTaskPriorityLoading}
									onClick={() => editTaskPriority(3)}
								>
									<IconCircle className={'text-red-500'} />
									Высокий
								</ContextMenuItem>
							)}
						</ContextMenuSubContent>
					</ContextMenuSub>
				)}

				{!isCompleted && isAccess && (
					<ContextMenuSub>
						<ContextMenuSubTrigger
							disabled={isTagsLoading || isUpdateTagLoading}
							className={'flex items-center gap-x-2'}
						>
							<IconTag className={'text-muted-foreground'} />
							Тег задачи
						</ContextMenuSubTrigger>

						<ContextMenuSubContent>
							{tags &&
								(tags.length === 0 ? (
									<ContextMenuItem disabled className={'text-muted-foreground'}>
										Нет тегов
									</ContextMenuItem>
								) : (
									<>
										{tags?.map((tag) => (
											<ContextMenuItem
												key={tag.id}
												onClick={() => {
													updateTag({
														taskId: task.id,
														tagId: tag.id,
													});
												}}
											>
												{tag.name}
											</ContextMenuItem>
										))}

										<ContextMenuItem
											onClick={() => {
												updateTag({
													taskId: task.id,
													tagId: null,
												});
											}}
										>
											<IconCancel />
											Отвязать тег
										</ContextMenuItem>
									</>
								))}
						</ContextMenuSubContent>
					</ContextMenuSub>
				)}

				{!isCompleted && isAccess && (
					<EditTaskDatesModal taskId={task.id}>
						<Button
							variant={'ghost'}
							size={'sm'}
							className={'w-full justify-start font-normal'}
						>
							<IconCalendar className={'text-muted-foreground'} />
							Изменить сроки
						</Button>
					</EditTaskDatesModal>
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
