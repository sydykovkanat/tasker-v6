import { ReactNode } from 'react';

import { ITask } from '@/features/task/types';

import { PriorityBadge } from '@/shared/components/shared';
import { date, formatStatus } from '@/shared/lib';

interface Props {
	task: ITask;
}

interface InfoBlockProps {
	label: string;
	value: string | ReactNode;
}

export function TaskInfo({ task }: Props) {
	const isOneDayDeadline =
		new Date(task.startDate).getTime() === new Date(task.endDate).getTime();

	return (
		<div className={'space-y-4'}>
			<InfoBlock label={'Статус'} value={formatStatus(task.status.id).label} />

			<InfoBlock
				label={'Приоритет'}
				value={<PriorityBadge priority={task.priority} />}
			/>

			{isOneDayDeadline ? (
				<InfoBlock label={'Дедлайн'} value={date(task.startDate)} />
			) : (
				<>
					<InfoBlock label={'Дата начала'} value={date(task.startDate)} />

					<InfoBlock label={'Дата окончания'} value={date(task.endDate)} />
				</>
			)}

			<InfoBlock label={'Дата обновления'} value={date(task.updatedDate)} />

			<InfoBlock label={'Просмотрено'} value={task.isView ? 'Да' : 'Нет'} />

			<div className={'space-y-1'}>
				<h4 className={'text-muted-foreground'}>Описание</h4>

				<p
					className={'bg-secondary rounded-lg border border-dashed p-2'}
					dangerouslySetInnerHTML={{ __html: task.description }}
				/>
			</div>
		</div>
	);
}

function InfoBlock({ label, value }: InfoBlockProps) {
	return (
		<div className={'grid grid-cols-5 items-center gap-x-4'}>
			<h4 className={'text-muted-foreground col-span-2'}>{label}</h4>

			<p className={'col-span-3'}>{value}</p>
		</div>
	);
}
