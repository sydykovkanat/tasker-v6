import { Link } from 'react-router-dom';

import { TaskMenu } from '@/features/task/components';
import { ITask } from '@/features/task/types';

import {
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
import { date } from '@/shared/lib';

interface Props {
	task: ITask;
}

export function TaskCard({ task }: Props) {
	return (
		<TaskMenu task={task}>
			<Link to={`/tasks/${task.id}`}>
				<Card className={'py-4'}>
					<CardContent className={'space-y-2.5 px-4'}>
						{task.project && (
							<Badge
								variant={'secondary'}
								className={'border-border border-dashed'}
							>
								{task.project.name}
							</Badge>
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

								{task.status.id !== 3 && (
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
					</CardContent>
				</Card>
			</Link>
		</TaskMenu>
	);
}
