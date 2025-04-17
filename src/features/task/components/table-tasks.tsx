import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { TaskMenu } from '@/features/task/components/task-menu';
import { ITask } from '@/features/task/types';

import {
	IconFolder,
	IconTag,
	PriorityBadge,
	StatusBadge,
} from '@/shared/components/shared';
import {
	Badge,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui';
import { date } from '@/shared/lib';
import { cn } from '@/shared/utils';

interface Props {
	tasks: ITask[];
}

export function TableTasks({ tasks }: Props) {
	const navigate = useNavigate();

	const handleCellClick = (taskId: number) => {
		navigate(`/tasks/${taskId}`);
	};

	return (
		<AnimatePresence mode={'popLayout'}>
			<Table className={'table-fixed'}>
				<TableHeader>
					<TableRow>
						<TableHead className={'w-[100px]'}>Приоритет</TableHead>
						<TableHead>Название</TableHead>
						<TableHead>Автор</TableHead>
						<TableHead>Исполнитель</TableHead>
						<TableHead>Проект / Тег</TableHead>
						<TableHead className={'w-[100px]'}>Статус</TableHead>
						<TableHead className={'w-[110px]'}>Начало</TableHead>
						<TableHead className={'w-[110px]'}>Окончание</TableHead>
						<TableHead className={'w-[120px]'}>Обновлено</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tasks.map((task) => {
						const authorName = task.author.name
							.split(' ')
							.slice(0, 2)
							.join(' ');
						const performerName = task.performer.name
							.split(' ')
							.slice(0, 2)
							.join(' ');
						const formattedDates = {
							startDate: date(task.startDate, 'dd MMM'),
							endDate: date(task.endDate, 'dd MMM'),
							updatedDate: date(task.updatedDate, 'hh:mm - dd MMM'),
						};

						return (
							<TaskMenu task={task}>
								<motion.tr
									key={task.id}
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.3 }}
									data-slot='table-row'
									className={cn(
										'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
									)}
									onClick={() => handleCellClick(task.id)}
								>
									<TableCell>
										<PriorityBadge priority={task.priority} />
									</TableCell>
									<TableCell>
										<p className={'text-wrap'}>{task.taskName}</p>
									</TableCell>
									<TableCell className={'truncate'}>{authorName}</TableCell>
									<TableCell className={'truncate'}>{performerName}</TableCell>
									<TableCell>
										<div className={'flex items-center gap-x-2'}>
											{task.project && (
												<Badge
													variant={'secondary'}
													className={'border-border border-dashed'}
												>
													<IconFolder />
													{task.project.name}
												</Badge>
											)}

											{task.tagDto && (
												<Badge
													variant={'secondary'}
													className={'border-border border-dashed'}
												>
													<IconTag />
													{task.tagDto.name}
												</Badge>
											)}
										</div>
									</TableCell>
									<TableCell>
										<StatusBadge status={task.status} />
									</TableCell>
									<TableCell className={'truncate'}>
										{formattedDates.startDate}
									</TableCell>
									<TableCell className={'truncate'}>
										{formattedDates.endDate}
									</TableCell>
									<TableCell className={'truncate'}>
										{formattedDates.updatedDate}
									</TableCell>
								</motion.tr>
							</TaskMenu>
						);
					})}
				</TableBody>
			</Table>
		</AnimatePresence>
	);
}
