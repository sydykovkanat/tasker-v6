import { ReactNode } from 'react';

import { useAuthStore } from '@/features/auth/store';
import { useGetProjects } from '@/features/project/hooks';
import { useGetTags } from '@/features/tag/hooks';
import {
	ChangePriorityMenu,
	ChangeProjectMenu,
	ChangeStatusMenu,
	ChangeTagMenu,
} from '@/features/task/components';
import { EditTaskDatesModal } from '@/features/task/components/edit-task-dates-modal';
import { ITask } from '@/features/task/types';

import {
	IconCalendar,
	IconCancel,
	IconDescription,
	IconEdit,
	IconFolder,
	IconFolderEdit,
	IconPriority,
	IconStatus,
	IconTag,
	IconView,
	IconViewOffSlash,
	PriorityBadge,
	StatusBadge,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { date } from '@/shared/lib';
import { IHugeIcon } from '@/shared/types';
import { cn } from '@/shared/utils';

interface Props {
	task: ITask;
}

interface InfoBlockProps {
	label: string;
	value: string | ReactNode;
	icon?: IHugeIcon;
	titleClassName?: string;
	isAccess?: boolean;
	valueClassName?: string;
	action?: ReactNode;
}

export function TaskInfo({ task }: Props) {
	const { tags, isTagsLoading } = useGetTags();
	const { projects, isProjectsLoading } = useGetProjects();
	const user = useAuthStore((state) => state.user);
	const isAccess =
		(user?.roles.includes('ADMIN') ||
			user?.id === task.author.id ||
			user?.id === task.performer.id) &&
		task.status.id !== 3 &&
		task.status.id !== 4;

	const isOneDayDeadline =
		new Date(task.startDate).getTime() === new Date(task.endDate).getTime();

	return (
		<div className={'space-y-4.5'}>
			{task.status.id === 4 && task.reason && (
				<InfoBlock
					label={'Причина отклонения'}
					value={task.reason}
					icon={IconCancel}
					titleClassName={'text-destructive'}
				/>
			)}

			<InfoBlock
				label={'Статус'}
				value={<StatusBadge status={task.status} />}
				icon={IconStatus}
				isAccess={isAccess}
				action={
					<ChangeStatusMenu taskId={task.id} currentStatusId={task.status.id}>
						<Button
							size={'icon-sm'}
							variant={'secondary'}
							className={'rounded-sm border'}
						>
							<IconEdit />
						</Button>
					</ChangeStatusMenu>
				}
			/>

			<InfoBlock
				label={'Приоритет'}
				value={<PriorityBadge priority={task.priority} />}
				icon={IconPriority}
				isAccess={isAccess}
				action={
					<ChangePriorityMenu
						taskId={task.id}
						currentPriorityId={task.priority.id}
					>
						<Button
							size={'icon-sm'}
							variant={'secondary'}
							className={'rounded-sm border'}
						>
							<IconEdit />
						</Button>
					</ChangePriorityMenu>
				}
			/>

			<InfoBlock
				label={'Проект'}
				value={task.project?.name}
				icon={IconFolder}
				isAccess={isAccess}
				action={
					<ChangeProjectMenu
						projects={projects}
						taskId={task.id}
						currentProjectId={task.project?.id}
					>
						<Button
							loading={isProjectsLoading}
							size={'icon-sm'}
							variant={'secondary'}
							className={'rounded-sm border'}
						>
							<IconFolderEdit />
						</Button>
					</ChangeProjectMenu>
				}
			/>

			<InfoBlock
				label={'Тег'}
				value={task.tagDto?.name}
				icon={IconTag}
				isAccess={isAccess}
				action={
					<ChangeTagMenu
						tags={tags}
						taskId={task.id}
						currentTagId={task.tagDto?.id}
					>
						<Button
							loading={isTagsLoading}
							size={'icon-sm'}
							variant={'secondary'}
							className={'rounded-sm border'}
						>
							<IconEdit />
						</Button>
					</ChangeTagMenu>
				}
			/>

			{isOneDayDeadline ? (
				<InfoBlock
					label={'Дедлайн'}
					value={date(task.startDate)}
					icon={IconCalendar}
					isAccess={isAccess}
					action={
						<EditTaskDatesModal taskId={task.id}>
							<Button
								size={'icon-sm'}
								variant={'secondary'}
								className={'rounded-sm border'}
							>
								<IconEdit />
							</Button>
						</EditTaskDatesModal>
					}
				/>
			) : (
				<>
					<InfoBlock
						label={'Дата начала'}
						value={date(task.startDate)}
						isAccess={isAccess}
						action={
							<EditTaskDatesModal taskId={task.id}>
								<Button
									size={'icon-sm'}
									variant={'secondary'}
									className={'rounded-sm border'}
								>
									<IconEdit />
								</Button>
							</EditTaskDatesModal>
						}
					/>

					<InfoBlock
						label={'Дата окончания'}
						value={date(task.endDate)}
						isAccess={isAccess}
						action={
							<EditTaskDatesModal taskId={task.id}>
								<Button
									size={'icon-sm'}
									variant={'secondary'}
									className={'rounded-sm border'}
								>
									<IconEdit />
								</Button>
							</EditTaskDatesModal>
						}
					/>
				</>
			)}

			<InfoBlock label={'Дата обновления'} value={date(task.updatedDate)} />

			<InfoBlock
				label={'Просмотрено'}
				value={task.isView ? 'Да' : 'Нет'}
				icon={task.isView ? IconView : IconViewOffSlash}
			/>

			<div className={'space-y-1'}>
				<h4 className={'text-muted-foreground flex items-center gap-x-2'}>
					<IconDescription className={'size-4'} />
					Описание
				</h4>

				<p
					className={
						'bg-secondary rounded-lg border border-dashed p-2 px-4 whitespace-pre-wrap'
					}
					dangerouslySetInnerHTML={{ __html: task.description }}
				/>
			</div>
		</div>
	);
}

function InfoBlock({
	label,
	value,
	icon: Icon,
	isAccess,
	titleClassName,
	valueClassName,
	action,
}: InfoBlockProps) {
	return (
		<div className={'grid grid-cols-5 items-center gap-x-4'}>
			<h4
				className={cn(
					'text-muted-foreground col-span-2 flex items-center gap-x-2',
					titleClassName,
				)}
			>
				{Icon ? (
					<Icon className={'size-4 text-inherit'} />
				) : (
					<i className={'size-4 text-inherit'} />
				)}
				{label}
			</h4>

			<div className={'col-span-3 flex items-center gap-x-4'}>
				<p className={cn('col-span-3', valueClassName)}>{value || 'Нет'}</p>

				{action && isAccess && action}
			</div>
		</div>
	);
}
