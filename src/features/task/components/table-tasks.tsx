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
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/components/ui';
import { date } from '@/shared/lib';
import { cn } from '@/shared/utils';

interface Props {
	tasks: ITask[];
	viewPriority?: boolean;
	viewTaskName?: boolean;
	viewAuthor?: boolean;
	viewPerformer?: boolean;
	viewProject?: boolean;
	viewDepartment?: boolean;
	viewTag?: boolean;
	viewStatus?: boolean;
	viewStartDate?: boolean;
	viewEndDate?: boolean;
	viewUpdatedDate?: boolean;
}

export function TableTasks({
	tasks,
	viewPriority = true,
	viewTaskName = true,
	viewAuthor = true,
	viewPerformer = true,
	viewDepartment = true,
	viewProject = true,
	viewTag = true,
	viewStatus = true,
	viewStartDate = true,
	viewEndDate = true,
	viewUpdatedDate = true,
}: Props) {
	const navigate = useNavigate();

	const handleCellClick = (taskId: number) => {
		navigate(`/tasks/${taskId}`);
	};

	return (
		<AnimatePresence mode={'popLayout'}>
			<Table className={'table-fixed'}>
				<TableHeader>
					<TableRow>
						{viewPriority && (
							<TableHead className={'w-[60px]'}>Приор.</TableHead>
						)}

						{viewTaskName && <TableHead>Название</TableHead>}

						{viewAuthor && <TableHead>Автор</TableHead>}

						{viewPerformer && <TableHead>Исполнитель</TableHead>}

						{viewDepartment && (
							<TableHead className={'w-[120px]'}>Отдел</TableHead>
						)}

						{(viewProject || viewTag) && (
							<TableHead>
								{viewProject && 'Проект'}
								{viewProject && viewTag && <i className={'mx-1.5'}>•</i>}
								{viewTag && 'Тег'}
							</TableHead>
						)}

						{viewStatus && (
							<TableHead className={'w-[100px] text-center'}>Статус</TableHead>
						)}

						{(viewStartDate || viewEndDate) && (
							<TableHead className={'w-[140px]'}>
								{viewStartDate && 'Начало'}
								{viewStartDate && viewEndDate && <i className={'mx-1.5'}>•</i>}
								{viewEndDate && 'Конец'}
							</TableHead>
						)}

						{viewUpdatedDate && (
							<TableHead className={'w-[120px]'}>Обновлено</TableHead>
						)}
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
							<TaskMenu task={task} key={task.id}>
								<motion.tr
									key={task.id}
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.3 }}
									data-slot='table-row'
									className={cn(
										'hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer border-b transition-colors',
									)}
									onClick={() => handleCellClick(task.id)}
								>
									{viewPriority && (
										<TableCell>
											<div className={'flex items-center'}>
												<PriorityBadge full={false} priority={task.priority} />
											</div>
										</TableCell>
									)}

									{viewTaskName && (
										<TableCell>
											<p className={'text-wrap'}>{task.taskName}</p>
										</TableCell>
									)}

									{viewAuthor && (
										<TableCell className={'truncate'}>{authorName}</TableCell>
									)}

									{viewPerformer && (
										<TableCell className={'truncate'}>
											{performerName}
										</TableCell>
									)}

									{viewDepartment && (
										<TableCell className={'truncate'}>
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<p className={'truncate'}>
															{task.departmentDto.departmentName}
														</p>
													</TooltipTrigger>

													<TooltipContent className={'border'}>
														{task.departmentDto.departmentName}
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</TableCell>
									)}

									{(viewProject || viewTag) && (
										<TableCell className={'w-[100px] truncate'}>
											<div className={'flex items-center gap-x-2'}>
												{task.project && viewProject && (
													<Badge
														variant={'secondary'}
														className={'border-border border-dashed'}
													>
														<IconFolder />
														{task.project.name}
													</Badge>
												)}

												{task.tagDto && viewTag && (
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
									)}

									{viewStatus && (
										<TableCell>
											<div className={'flex items-center justify-center'}>
												<StatusBadge status={task.status} />
											</div>
										</TableCell>
									)}

									{(viewStartDate || viewEndDate) && (
										<TableCell className={'truncate'}>
											{viewStartDate && <span>{formattedDates.startDate}</span>}

											{viewStartDate && viewEndDate && (
												<i className={'mx-1.5'}>•</i>
											)}

											{viewEndDate && <span>{formattedDates.endDate}</span>}
										</TableCell>
									)}

									{viewUpdatedDate && (
										<TableCell className={'truncate'}>
											{formattedDates.updatedDate}
										</TableCell>
									)}
								</motion.tr>
							</TaskMenu>
						);
					})}
				</TableBody>
			</Table>
		</AnimatePresence>
	);
}
