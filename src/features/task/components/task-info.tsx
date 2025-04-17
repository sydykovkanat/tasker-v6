import { ReactNode } from 'react';

import { ITask } from '@/features/task/types';

import {
	IconCalendar,
	IconCancel,
	IconDescription,
	IconFolder,
	IconPriority,
	IconStatus,
	IconTag,
	IconView,
	IconViewOffSlash,
	PriorityBadge,
	StatusBadge,
} from '@/shared/components/shared';
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
	valueClassName?: string;
}

export function TaskInfo({ task }: Props) {
	const isOneDayDeadline =
		new Date(task.startDate).getTime() === new Date(task.endDate).getTime();

	return (
		<div className={'space-y-4'}>
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
			/>

			<InfoBlock
				label={'Приоритет'}
				value={<PriorityBadge priority={task.priority} />}
				icon={IconPriority}
			/>

			{task.project && (
				<InfoBlock
					label={'Проект'}
					value={task.project.name}
					icon={IconFolder}
				/>
			)}

			{task.tagDto && (
				<InfoBlock label={'Тег'} value={task.tagDto.name} icon={IconTag} />
			)}

			{isOneDayDeadline ? (
				<InfoBlock
					label={'Дедлайн'}
					value={date(task.startDate)}
					icon={IconCalendar}
				/>
			) : (
				<>
					<InfoBlock label={'Дата начала'} value={date(task.startDate)} />

					<InfoBlock label={'Дата окончания'} value={date(task.endDate)} />
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
	titleClassName,
	valueClassName,
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

			<p className={cn('col-span-3', valueClassName)}>{value}</p>
		</div>
	);
}
