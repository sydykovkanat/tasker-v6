import {
	ArrowRightIcon,
	Check,
	ChevronLeft,
	ChevronRight,
	ChevronsUpDown,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store';
import { useGetDepartments } from '@/features/department/hooks';
import { IDepartment } from '@/features/department/types';
import { useGetTasks } from '@/features/task/hooks';
import { ITask } from '@/features/task/types';

import { ErrorBlock, Loading, PageTitles } from '@/shared/components/shared';
import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/shared/components/ui';
import { cn } from '@/shared/utils';

// Типы данных
interface TaskWithRow extends ITask {
	rowIndex: number;
	performerId: number;
	totalRows: number;
}

interface PerformerGroup {
	performer: { id: number; name: string };
	totalRows: number;
	tasks: TaskWithRow[];
}

// Константы
const STATUS_COLORS = {
	1: 'bg-blue-100 border border-l-2 border-b-2 border-blue-500', // Новая
	2: 'bg-yellow-100 border border-l-2 border-b-2 border-yellow-500', // В работе
	3: 'bg-green-100 border border-l-2 border-b-2 border-green-500', // Завершено
	4: 'bg-red-100 border border-l-2 border-b-2 border-red-500', // Отклонено
	default: 'bg-gray-100 border border-l-2 border-b-2 border-gray-500',
};

const ALL_DEPARTMENTS: IDepartment = {
	id: 0,
	departmentName: 'Все департаменты',
	responsiblePersonName: '',
};

export function Calendar() {
	const user = useAuthStore((state) => state.user);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDepartment, setSelectedDepartment] = useState<
		IDepartment | undefined
	>(undefined);

	const { tasks, isTasksLoading } = useGetTasks(
		undefined,
		undefined,
		undefined,
		selectedDepartment?.id,
	);
	const { departments, isDepartmentsLoading } = useGetDepartments();
	const isAccess = user?.roles.includes('ADMIN');

	// Вычисляемые значения для текущего месяца
	const { currentYear, currentMonth, daysInMonth, firstDay, lastDay } =
		useMemo(() => {
			const year = currentDate.getFullYear();
			const month = currentDate.getMonth();
			return {
				currentYear: year,
				currentMonth: month,
				daysInMonth: new Date(year, month + 1, 0).getDate(),
				firstDay: new Date(year, month, 1),
				lastDay: new Date(year, month, new Date(year, month + 1, 0).getDate()),
			};
		}, [currentDate]);

	// Форматирование дат
	const formatMonthYear = (date: Date) => {
		return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
	};

	const formatShortDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
		});
	};

	// Обработчики событий
	const handleDepartmentChange = (department: IDepartment) => {
		setSelectedDepartment(department);
	};

	const navigateMonth = (direction: number) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() + direction);
		setCurrentDate(newDate);
	};

	const goToCurrentMonth = () => {
		setCurrentDate(new Date());
	};

	// Вспомогательные функции для обработки задач - определяем их перед useMemo
	const doTasksOverlap = (task1: ITask, task2: ITask) => {
		const start1 = new Date(task1.startDate);
		const end1 = new Date(task1.endDate);
		const start2 = new Date(task2.startDate);
		const end2 = new Date(task2.endDate);

		return (
			start1 <= new Date(end2.getTime() + 24 * 60 * 60 * 1000) &&
			start2 <= new Date(end1.getTime() + 24 * 60 * 60 * 1000)
		);
	};

	const assignRowsToTasks = (tasks: ITask[]): TaskWithRow[] => {
		// Сортировка задач по исполнителю и дате начала
		const sortedTasks = [...tasks].sort((a, b) => {
			if (a.performer.id !== b.performer.id) {
				return a.performer.id - b.performer.id;
			}
			return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
		});

		// Группировка задач по исполнителю
		const tasksByPerformer: Record<number, ITask[]> = {};
		sortedTasks.forEach((task) => {
			const performerId = task.performer.id;
			if (!tasksByPerformer[performerId]) {
				tasksByPerformer[performerId] = [];
			}
			tasksByPerformer[performerId].push(task);
		});

		// Распределение задач по рядам для каждого исполнителя
		const tasksWithRows: TaskWithRow[] = [];
		Object.entries(tasksByPerformer).forEach(
			([performerId, performerTasks]) => {
				const rows: ITask[][] = [];

				performerTasks.forEach((task) => {
					let rowIndex = 0;
					let foundRow = false;

					// Поиск ряда, где нет пересечений с другими задачами
					while (rowIndex < rows.length && !foundRow) {
						const rowTasks = rows[rowIndex];
						const hasOverlap = rowTasks.some((rowTask) =>
							doTasksOverlap(task, rowTask),
						);

						if (!hasOverlap) {
							foundRow = true;
							rowTasks.push(task);
						} else {
							rowIndex++;
						}
					}

					// Если подходящий ряд не найден, создаем новый
					if (!foundRow) {
						rows.push([task]);
					}
				});

				// Добавляем информацию о ряде к каждой задаче
				rows.forEach((rowTasks, rowIndex) => {
					rowTasks.forEach((task) => {
						tasksWithRows.push({
							...task,
							rowIndex,
							performerId: parseInt(performerId),
							totalRows: rows.length,
						});
					});
				});
			},
		);

		return tasksWithRows;
	};

	const groupTasksByPerformer = (
		tasks: TaskWithRow[],
	): Record<number, PerformerGroup> => {
		const performerGroups: Record<number, PerformerGroup> = {};

		tasks.forEach((task) => {
			const performerId = task.performer.id;
			if (!performerGroups[performerId]) {
				performerGroups[performerId] = {
					performer: task.performer,
					totalRows: task.totalRows,
					tasks: [],
				};
			}
			performerGroups[performerId].tasks.push(task);
		});

		return performerGroups;
	};

	// Фильтрация и обработка задач - теперь функции определены выше
	const processedTasks = useMemo(() => {
		if (!tasks) return { tasksWithRows: [], performerGroups: {} };

		// Фильтрация задач для текущего месяца
		const filteredTasks = tasks
			.filter((task) => {
				const taskStart = new Date(task.startDate);
				const taskEnd = new Date(task.endDate);

				return (
					(taskStart <= lastDay && taskEnd >= firstDay) ||
					(taskStart.getMonth() === currentMonth &&
						taskStart.getFullYear() === currentYear) ||
					(taskEnd.getMonth() === currentMonth &&
						taskEnd.getFullYear() === currentYear)
				);
			})
			.sort(
				(a, b) =>
					new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
			);

		// Используем функции, определенные выше
		const tasksWithRows = assignRowsToTasks(filteredTasks);
		const performerGroups = groupTasksByPerformer(tasksWithRows);

		return { tasksWithRows, performerGroups };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tasks, firstDay, lastDay, currentMonth, currentYear]);

	// Вычисление визуальных параметров для отрисовки задач
	const getTaskBarWidth = (startDate: string, endDate: string): number => {
		const start = new Date(startDate);
		const end = new Date(endDate);

		const visibleStart = start < firstDay ? firstDay : start;
		const visibleEnd = end > lastDay ? lastDay : end;

		const daysDiff =
			(visibleEnd.getTime() - visibleStart.getTime()) / (24 * 60 * 60 * 1000);
		const width = ((daysDiff + 1) / daysInMonth) * 100;

		return Math.max(width, 5); // Минимальная ширина для видимости
	};

	const getTaskBarLeft = (startDate: string): number => {
		const start = new Date(startDate);
		const visibleStart = start < firstDay ? firstDay : start;

		const daysSinceMonthStart =
			(visibleStart.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000);
		return (daysSinceMonthStart / daysInMonth) * 100;
	};

	// Компоненты для отображения UI-элементов
	const RenderDayLabels = () => {
		const labels = [];

		for (let i = 1; i <= daysInMonth; i += 1) {
			if (i % 5 === 1 || i === 1 || i === daysInMonth) {
				const position = ((i - 1) / daysInMonth) * 100;
				labels.push(
					<div
						key={`day-label-${i}`}
						className='absolute text-xs text-gray-500'
						style={{ left: `${position}%` }}
					>
						{i}
					</div>,
				);
			}
		}

		return <>{labels}</>;
	};

	const TodayMarker = () => {
		const today = new Date();

		if (
			today.getMonth() === currentMonth &&
			today.getFullYear() === currentYear
		) {
			const position = ((today.getDate() - 1) / daysInMonth) * 100;

			return (
				<div
					className='absolute z-10 h-full w-px bg-blue-400'
					style={{ left: `${position}%` }}
					title='Сегодня'
				/>
			);
		}

		return null;
	};

	const StatusLegend = () => (
		<div className='flex items-center justify-start gap-3 text-xs'>
			<div className='flex items-center'>
				<div className='mr-1 h-3 w-3 rounded-sm border border-blue-500 bg-blue-100'></div>
				<span>Новая</span>
			</div>
			<div className='flex items-center'>
				<div className='mr-1 h-3 w-3 rounded-sm border border-yellow-500 bg-yellow-100'></div>
				<span>В работе</span>
			</div>
			<div className='flex items-center'>
				<div className='mr-1 h-3 w-3 rounded-sm border border-green-500 bg-green-100'></div>
				<span>Завершено</span>
			</div>
			<div className='flex items-center'>
				<div className='mr-1 h-3 w-3 rounded-sm border border-red-500 bg-red-100'></div>
				<span>Отклонено</span>
			</div>
		</div>
	);

	const DepartmentSelector = () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					size={'lg'}
					className='justify-between overflow-hidden font-normal'
				>
					{selectedDepartment?.departmentName || 'Выберите департамент'}
					<ChevronsUpDown className='opacity-35' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[400px] p-0'>
				<Command>
					<CommandInput placeholder='Поиск по названию...' className='h-9' />
					<CommandList>
						<CommandEmpty>Департаменты не найдены.</CommandEmpty>
						<CommandGroup>
							<CommandItem
								onSelect={() => handleDepartmentChange(ALL_DEPARTMENTS)}
								className={'justify-start text-start'}
							>
								Все департаменты
								<Check
									className={cn(
										'ml-auto',
										selectedDepartment?.id === 0 ? 'opacity-100' : 'opacity-0',
									)}
								/>
							</CommandItem>

							{departments?.map((department) => (
								<CommandItem
									className={'truncate text-nowrap'}
									key={department.id}
									value={department.departmentName}
									onSelect={() => handleDepartmentChange(department)}
								>
									{department.departmentName}
									<Check
										className={cn(
											'ml-auto',
											selectedDepartment?.id === department.id
												? 'opacity-100'
												: 'opacity-0',
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);

	const MonthNavigation = () => {
		const isCurrentMonth =
			new Date().getMonth() === currentDate.getMonth() &&
			new Date().getFullYear() === currentDate.getFullYear();

		return (
			<>
				<Button
					size={'lg'}
					className={'font-normal'}
					variant='outline'
					onClick={goToCurrentMonth}
					disabled={isCurrentMonth}
				>
					Текущий месяц
				</Button>

				<div className='flex items-center justify-between gap-x-2'>
					<Button
						size='lg'
						onClick={() => navigateMonth(-1)}
						variant='outline'
						className='hover:bg-secondary size-11 rounded-full p-1'
					>
						<ChevronLeft className='h-5 w-5' />
					</Button>
					<span className='w-38 text-center text-lg first-letter:uppercase'>
						{formatMonthYear(currentDate)}
					</span>
					<Button
						size='lg'
						onClick={() => navigateMonth(1)}
						variant='outline'
						className='size-11 rounded-full p-1 hover:bg-gray-100'
					>
						<ChevronRight className='h-5 w-5' />
					</Button>
				</div>
			</>
		);
	};

	const TaskTooltip = ({ task }: { task: TaskWithRow }) => (
		<TooltipContent
			className={'bg-background text-foreground max-w-max p-0 text-sm'}
		>
			<div className={'rounded-lg p-4 shadow-sm'}>
				<h4 className={'mb-1 line-clamp-2 max-w-52 font-medium'}>
					{task.taskName}
				</h4>

				{task.author.id !== task.performer.id && (
					<div>
						<h4 className={'text-muted-foreground text-xs'}>Автор:</h4>
						<p>{task.author.name}</p>
					</div>
				)}

				<div>
					<h4 className={'text-muted-foreground text-xs'}>Исполнитель:</h4>
					<p>{task.performer.name}</p>
				</div>

				<Link to={`/tasks/${task.id}`}>
					<Button
						variant={'outline'}
						size={'sm'}
						className={'mt-2 ml-auto flex justify-end'}
					>
						Перейти <ArrowRightIcon className={'size-4'} />
					</Button>
				</Link>
			</div>
		</TooltipContent>
	);

	// Рендеринг загрузки и ошибок
	if (isTasksLoading || isDepartmentsLoading) {
		return <Loading />;
	}

	if (!tasks) {
		return <ErrorBlock />;
	}

	return (
		<div className='overflow-hidden bg-white shadow'>
			<PageTitles
				title={'Календарь'}
				description={
					'Отслеживайте продолжительность задач и планируйте рабочую нагрузку по дням.'
				}
				className={'px-4 py-2'}
			>
				<div className='flex items-center gap-x-4'>
					{isAccess && <DepartmentSelector />}
					<MonthNavigation />
				</div>
			</PageTitles>

			<div className='p-4'>
				<div className='sticky top-0 mb-6 h-6 border-b border-gray-200'>
					<RenderDayLabels />
				</div>

				<div className='relative'>
					<TodayMarker />

					{Object.keys(processedTasks.performerGroups).length === 0 ? (
						<div className='flex min-h-screen items-center justify-center text-center text-gray-500'>
							<p>Нет задач для отображения в этом месяце</p>
						</div>
					) : (
						<div className='min-h-screen space-y-6'>
							{Object.values(processedTasks.performerGroups).map((group) => (
								<div key={group.performer.id} className='mb-6'>
									<div className='mb-2 font-medium text-gray-700'>
										{group.performer.name}
									</div>
									<div className='space-y-2'>
										{Array.from({ length: group.totalRows }).map(
											(_, rowIndex) => (
												<div
													key={`${group.performer.id}-row-${rowIndex}`}
													className='relative h-10'
												>
													<div className='absolute top-0 left-0 h-full w-full rounded-sm bg-gray-50' />

													{group.tasks
														.filter((task) => task.rowIndex === rowIndex)
														.map((task) => {
															const left = getTaskBarLeft(task.startDate);
															const width = getTaskBarWidth(
																task.startDate,
																task.endDate,
															);
															const statusColor =
																STATUS_COLORS[
																	task.status.id as keyof typeof STATUS_COLORS
																] || STATUS_COLORS.default;

															return (
																<Tooltip key={task.id}>
																	<TooltipTrigger asChild>
																		<div
																			className={`absolute top-1 h-8 ${statusColor} rounded-md transition-all duration-200`}
																			style={{
																				left: `${left}%`,
																				width: `${width}%`,
																				zIndex: 1,
																			}}
																		>
																			<div className='flex h-full w-full items-center justify-between overflow-hidden px-1'>
																				<span className='truncate text-xs'>
																					{formatShortDate(task.startDate)} -{' '}
																					{formatShortDate(task.endDate)}
																				</span>
																			</div>
																		</div>
																	</TooltipTrigger>
																	<TaskTooltip task={task} />
																</Tooltip>
															);
														})}
												</div>
											),
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<div className='border-t border-gray-200 px-4 py-2'>
				<StatusLegend />
			</div>
		</div>
	);
}
