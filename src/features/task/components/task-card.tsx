import { differenceInDays, parseISO, startOfToday } from 'date-fns';
import { Link } from 'react-router-dom';

import { TaskMenu } from '@/features/task/components';
import { ITask } from '@/features/task/types';

import {
	IconArrowsRight,
	IconView,
	IconViewOffSlash,
	PriorityBadge,
} from '@/shared/components/shared';
import {
	Avatar,
	Badge,
	Card,
	CardContent,
	CardTitle,
} from '@/shared/components/ui';
import { date, getDayDeclension } from '@/shared/lib';
import { cn } from '@/shared/utils';

interface Props {
	task: ITask;
}

export function TaskCard({ task }: Props) {
	return (
		<TaskMenu task={task}>
			<Link to={`/tasks/${task.id}`}>
				<Card className={'py-4'}>
					<CardContent className={'space-y-2.5 px-4'}>
						{(task.project || task.status.id === 4) && (
							<div className={'flex items-center gap-x-2'}>
								{task.project && (
									<Badge
										variant={'secondary'}
										className={'border-border border-dashed'}
									>
										{task.project.name}
									</Badge>
								)}
								{task.status.id === 4 && (
									<Badge
										variant={'destructive'}
										className={'border-background border-dashed'}
									>
										Отклонено
									</Badge>
								)}
							</div>
						)}

						<div className={'flex items-start justify-between gap-x-4'}>
							<CardTitle className={'text-[15px]'}>{task.taskName}</CardTitle>

							<div className={'flex items-center gap-x-2'}>
								{task.status.id !== 2 &&
									task.status.id !== 3 &&
									(task.isView ? (
										<IconView className={'text-muted-foreground size-5'} />
									) : (
										<IconViewOffSlash
											className={'text-muted-foreground size-5'}
										/>
									))}

								{task.priorityOrder && task.status.id !== 3 && (
									<Badge
										variant={'secondary'}
										className={'border-border border-dashed'}
									>
										{task.priorityOrder}
									</Badge>
								)}

								<PriorityBadge priority={task.priority} />
							</div>
						</div>

						<div
							className={'flex items-center justify-between gap-x-2 text-sm'}
						>
							<div className={'flex items-center gap-x-2'}>
								<Avatar
									className={'size-10'}
									src={task.performer.avatar}
									fallback={task.performer.name}
								/>

								<h5>{task.performer.name.split(' ').slice(0, 2).join(' ')}</h5>
							</div>

							<span className={'text-muted-foreground'}>
								Обнов: {date(task.updatedDate, 'hh:mm, dd MMM')}
							</span>
						</div>

						<Footer
							status={task.status.id}
							startDate={task.startDate}
							endDate={task.endDate}
						/>
					</CardContent>
				</Card>
			</Link>
		</TaskMenu>
	);
}

function Footer({
	status,
	startDate,
	endDate,
}: {
	status: number;
	startDate: string;
	endDate: string;
}) {
	const start = parseISO(startDate);
	const end = parseISO(endDate);
	const today = startOfToday();

	const timeDiff = end.getTime() - start.getTime();
	const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;

	const remainingDays = differenceInDays(end, today);

	const normalizedPercentage = Math.max(
		remainingDays < 0 ? 38 : 20,
		Math.min((remainingDays / 30) * 100, 100),
	);

	const barWidth = `${normalizedPercentage}%`;

	return status === 1 ? (
		<div className={'flex w-full items-center justify-between text-sm'}>
			<div className={'text-muted-foreground flex items-center gap-x-1'}>
				<span>{date(startDate)}</span>

				<IconArrowsRight className={'size-3.5'} />

				<span>{date(endDate)}</span>
			</div>

			<Badge
				variant={'secondary'}
				className={'border-border border border-dashed'}
			>
				Дано: {totalDays} {getDayDeclension(totalDays)}
			</Badge>
		</div>
	) : status === 2 ? (
		<div className={'h-4 w-full rounded-full border bg-gray-200 shadow-inner'}>
			<div
				className={cn(
					'bg-primary relative top-1/2 left-0 h-4 -translate-y-2/4 rounded-full border p-1 shadow-md',
					{
						'bg-destructive': remainingDays < 0,
					},
				)}
				style={{ width: barWidth }}
			>
				<span className='text-muted absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-xs text-nowrap'>
					{remainingDays < 0
						? `Просрочка на ${Math.abs(remainingDays)} ${getDayDeclension(remainingDays)}`
						: `${remainingDays} ${getDayDeclension(remainingDays)} ост.`}
				</span>
			</div>
		</div>
	) : null;
}
