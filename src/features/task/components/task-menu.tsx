import { PropsWithChildren } from 'react';

import { useAuthStore } from '@/features/auth/store';
import { useGetProjects } from '@/features/project/hooks';
import { useGetTags } from '@/features/tag/hooks';
import {
	ChangeTaskDepartmentModal,
	DeleteTaskModal,
	EditTaskModal,
} from '@/features/task/components';
import { EditTaskDatesModal } from '@/features/task/components/edit-task-dates-modal';
import {
	useEditTaskPriority,
	useEditTaskPriorityOrders,
	useEditTaskProject,
	useEditTaskStatus,
	useGetTasks,
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
	IconDepartement,
	IconFolder,
	IconNoteEdit,
	IconTag,
} from '@/shared/components/shared';
import {
	Button,
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from '@/shared/components/ui';

interface Props {
	task: ITask;
}

export function TaskMenu({ task, children }: PropsWithChildren<Props>) {
	const { editTaskStatus, isEditTaskStatusLoading } = useEditTaskStatus();
	const { editTaskPriority, isEditTaskPriorityLoading } = useEditTaskPriority();
	const { tags, isTagsLoading } = useGetTags();
	const { updateTag, isUpdateTagLoading } = useUpdateTaskTag();
	const { projects, isProjectsLoading } = useGetProjects();
	const { editProject, isEditTaskProjectLoading } = useEditTaskProject();
	const { editTaskPriorityOrder, isEditTaskPriorityOrderLoading } =
		useEditTaskPriorityOrders();
	const { tasks } = useGetTasks();

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

	const findAdjacentTasksByPerformer = () => {
		if (!tasks) return { prevTask: null, nextTask: null };

		const samePriorityTasks = tasks
			.filter(
				(t) =>
					t.performer.id === task.performer.id &&
					t.status.id === task.status.id &&
					t.priorityOrder,
			)
			.sort((a, b) => (a.priorityOrder || 0) - (b.priorityOrder || 0));

		const currentIndex = samePriorityTasks.findIndex((t) => t.id === task.id);
		if (currentIndex === -1) return { prevTask: null, nextTask: null };

		const prevTask =
			currentIndex > 0 ? samePriorityTasks[currentIndex - 1] : null;
		const nextTask =
			currentIndex < samePriorityTasks.length - 1
				? samePriorityTasks[currentIndex + 1]
				: null;

		return { prevTask, nextTask };
	};

	const { prevTask, nextTask } = findAdjacentTasksByPerformer();

	const handleRaisePriority = () => {
		if (!prevTask) return;

		editTaskPriorityOrder({
			firstTaskId: task.id,
			secondTaskId: prevTask.id,
		});
	};

	const handleLowerPriority = () => {
		if (!nextTask) return;

		editTaskPriorityOrder({
			firstTaskId: task.id,
			secondTaskId: nextTask.id,
		});
	};

	return (
		<ContextMenu modal={false}>
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
								onClick={() => editTaskStatus({ taskId: task.id, statusId: 1 })}
							>
								<IconCircleArrowUp />
								Перевести в новое
							</ContextMenuItem>
						)}

						{!isProgress && (
							<ContextMenuItem
								disabled={isEditTaskStatusLoading}
								onClick={() => editTaskStatus({ taskId: task.id, statusId: 2 })}
							>
								<IconCircleArrowRight />
								Перевести в работу
							</ContextMenuItem>
						)}

						{!isCompleted && (
							<ContextMenuItem
								disabled={isEditTaskStatusLoading}
								onClick={() => editTaskStatus({ taskId: task.id, statusId: 3 })}
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
									onClick={() =>
										editTaskPriority({ taskId: task.id, priorityId: 1 })
									}
								>
									<IconCircle className={'text-green-500'} />
									Низкий
								</ContextMenuItem>
							)}

							{!isMiddle && (
								<ContextMenuItem
									disabled={isEditTaskPriorityLoading}
									onClick={() =>
										editTaskPriority({ taskId: task.id, priorityId: 2 })
									}
								>
									<IconCircle className={'text-yellow-500'} />
									Средний
								</ContextMenuItem>
							)}

							{!isHigh && (
								<ContextMenuItem
									disabled={isEditTaskPriorityLoading}
									onClick={() =>
										editTaskPriority({ taskId: task.id, priorityId: 3 })
									}
								>
									<IconCircle className={'text-red-500'} />
									Высокий
								</ContextMenuItem>
							)}
						</ContextMenuSubContent>
					</ContextMenuSub>
				)}

				{!isCompleted && isAccess && (
					<>
						<ContextMenuItem
							onClick={handleRaisePriority}
							disabled={!prevTask || isEditTaskPriorityOrderLoading}
						>
							<IconCircleArrowDown className={'text-muted-foreground'} />
							Понизить приоритет
						</ContextMenuItem>

						<ContextMenuItem
							onClick={handleLowerPriority}
							disabled={!nextTask || isEditTaskPriorityOrderLoading}
						>
							<IconCircleArrowUp className={'text-muted-foreground'} />
							Поднять приоритет
						</ContextMenuItem>
					</>
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
												disabled={tag.id === task.tagDto?.id}
												onClick={() => {
													updateTag({
														taskId: task.id,
														tagId: tag.id,
													});
												}}
											>
												{tag.id === task.tagDto?.id && (
													<IconCircle className={'fill-foreground size-2'} />
												)}
												{tag.name}
											</ContextMenuItem>
										))}

										<ContextMenuSeparator />

										<ContextMenuItem
											disabled={!task.tagDto?.id}
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
					<ContextMenuSub>
						<ContextMenuSubTrigger
							disabled={isProjectsLoading || isEditTaskProjectLoading}
							className={'flex items-center gap-x-2'}
						>
							<IconFolder className={'text-muted-foreground'} />
							Проект задачи
						</ContextMenuSubTrigger>

						<ContextMenuSubContent>
							{projects &&
								(projects.length === 0 ? (
									<ContextMenuItem disabled className={'text-muted-foreground'}>
										Нет проектов
									</ContextMenuItem>
								) : (
									<>
										{projects.map((project) => (
											<ContextMenuItem
												key={project.id}
												disabled={project.id === task.project?.id}
												onClick={() => {
													editProject({
														taskId: task.id,
														projectId: project.id,
													});
												}}
											>
												{project.id === task.project?.id && (
													<IconCircle className={'fill-foreground size-2'} />
												)}
												{project.name}
											</ContextMenuItem>
										))}

										<ContextMenuSeparator />

										<ContextMenuItem
											disabled={!task.project?.id}
											onClick={() => {
												editProject({
													taskId: task.id,
													projectId: null,
												});
											}}
										>
											<IconCancel />
											Отвязать проект
										</ContextMenuItem>
									</>
								))}
						</ContextMenuSubContent>
					</ContextMenuSub>
				)}

				{!isCompleted && isAccess && (
					<ChangeTaskDepartmentModal taskId={task.id}>
						<Button
							variant={'ghost'}
							size={'sm'}
							className={'flex w-full justify-start font-normal'}
						>
							<IconDepartement className={'text-muted-foreground'} />
							Изменить департамент
						</Button>
					</ChangeTaskDepartmentModal>
				)}

				{!isCompleted && isAccess && (
					<EditTaskModal taskId={task.id}>
						<Button
							variant={'ghost'}
							size={'sm'}
							className={'flex w-full justify-start font-normal'}
						>
							<IconNoteEdit className={'text-muted-foreground'} />
							Редактировать задачу
						</Button>
					</EditTaskModal>
				)}

				{!isCompleted && isAccess && (
					<EditTaskDatesModal taskId={task.id}>
						<Button
							variant={'ghost'}
							size={'sm'}
							className={'flex w-full justify-start font-normal'}
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
