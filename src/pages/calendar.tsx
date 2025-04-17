import { ArrowRightIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetTasks } from '@/features/task/hooks';

import { ErrorBlock, Loading, PageTitles } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { stripHtml } from '@/shared/utils';

export function Calendar() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const { tasks, isTasksLoading } = useGetTasks();

	if (isTasksLoading) {
		return <Loading />;
	}

	if (!tasks) {
		return <ErrorBlock />;
	}

	const navigateMonth = (direction: number) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() + direction);
		setCurrentDate(newDate);
	};

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

	const formatFullDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	};

	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const firstDay = new Date(currentYear, currentMonth, 1);
	const lastDay = new Date(currentYear, currentMonth, daysInMonth);

	const getStatusColor = (priorityId: number) => {
		switch (priorityId) {
			case 1:
				return 'bg-blue-100 border border-l-2 border-b-2 border-blue-500';
			case 2:
				return 'bg-yellow-100 border border-l-2 border-b-2 border-yellow-500';
			case 3:
				return 'bg-green-100 border border-l-2 border-b-2 border-green-500';
			case 4:
				return 'bg-red-100 border border-l-2 border-b-2 border-red-500';
			default:
				return 'bg-gray-100 border border-l-2 border-b-2 border-gray-500';
		}
	};

	const visibleTasks = tasks
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

	const getTaskBarWidth = (startDate: string, endDate: string): number => {
		const start = new Date(startDate);
		const end = new Date(endDate);

		const visibleStart = start < firstDay ? firstDay : start;
		const visibleEnd = end > lastDay ? lastDay : end;

		const startDay = visibleStart.getDate();
		const endDay = visibleEnd.getDate();

		const width = ((endDay - startDay + 1) / daysInMonth) * 100;
		return Math.max(width, 7);
	};

	const getTaskBarLeft = (startDate: string): number => {
		const start = new Date(startDate);

		if (start < firstDay) {
			return 0;
		}

		const startDay = start.getDate();
		return ((startDay - 1) / daysInMonth) * 100;
	};

	const getDayLabels = () => {
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

		return labels;
	};

	const getTodayMarker = () => {
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
					<Button
						variant='outline'
						onClick={() => {
							const today = new Date();
							setCurrentDate(today);
						}}
						disabled={new Date().getMonth() === currentDate.getMonth()}
					>
						Текущий месяц
					</Button>

					<div className='flex items-center justify-between gap-x-2'>
						<Button
							size='sm'
							onClick={() => navigateMonth(-1)}
							variant='outline'
							className='hover:bg-secondary size-8 rounded-full p-1'
						>
							<ChevronLeft className='h-5 w-5' />
						</Button>
						<span className='w-38 text-center text-lg first-letter:uppercase'>
							{formatMonthYear(currentDate)}
						</span>
						<Button
							size='sm'
							onClick={() => navigateMonth(1)}
							variant='outline'
							className='size-8 rounded-full p-1 hover:bg-gray-100'
						>
							<ChevronRight className='h-5 w-5' />
						</Button>
					</div>
				</div>
			</PageTitles>

			<div className='p-4'>
				<div className='sticky top-0 mb-6 h-6 border-b border-gray-200'>
					{getDayLabels()}
				</div>

				<div className='relative'>
					{getTodayMarker()}

					{visibleTasks.length === 0 ? (
						<div className='flex min-h-screen items-center justify-center text-center text-gray-500'>
							<p>Нет задач для отображения в этом месяце</p>
						</div>
					) : (
						<div className='min-h-screen space-y-2'>
							{visibleTasks.map((task) => {
								const left = getTaskBarLeft(task.startDate);
								const width = getTaskBarWidth(task.startDate, task.endDate);

								return (
									<div key={task.id} className='group relative h-10'>
										<div className='absolute top-0 left-0 h-full w-full rounded-sm bg-gray-50 transition-colors duration-200 group-hover:bg-gray-100' />

										<div
											className={`absolute top-1 h-8 ${getStatusColor(task.status.id)} rounded-md transition-all duration-200 group-hover:shadow-md`}
											style={{ left: `${left}%`, width: `${width}%` }}
										>
											<div className='flex h-full w-full items-center justify-between overflow-hidden'>
												<span className='ml-2 text-xs whitespace-nowrap'>
													{formatShortDate(task.startDate)} -{' '}
													{formatShortDate(task.endDate)}
												</span>
											</div>

											{/* Hover details */}
											<div className='invisible absolute top-full left-0 z-20 mt-1 w-64 rounded-xl border bg-white p-4 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100'>
												<div className='font-medium'>{task.taskName}</div>
												<div className='mt-1 text-xs'>
													{formatFullDate(task.startDate)} -{' '}
													{formatFullDate(task.endDate)}
												</div>
												<div className='mt-1 text-xs text-gray-600'>
													Исполнитель: {task.performer.name}
												</div>
												<div className='mt-1 max-h-16 overflow-y-auto text-xs'>
													{stripHtml(task.description)}
												</div>

												<Link to={`/tasks/${task.id}`}>
													<Button
														size={'sm'}
														variant={'secondary'}
														className={'mt-2'}
													>
														Перейти к задаче
														<ArrowRightIcon />
													</Button>
												</Link>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>

			<div className='border-t border-gray-200 px-4 py-2'>
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
			</div>
		</div>
	);
}
