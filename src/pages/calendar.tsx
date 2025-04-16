import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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

	const getDaysInMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (year: number, month: number) => {
		return new Date(year, month, 1).getDay();
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('ru-RU', { month: 'long', year: '2-digit' });
	};

	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const daysInMonth = getDaysInMonth(currentYear, currentMonth);
	const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

	const getStatusColor = (priorityId: number) => {
		switch (priorityId) {
			case 1:
				return 'bg-blue-100 border-l-4 border-blue-500';
			case 2:
				return 'bg-yellow-100 border-l-4 border-yellow-500';
			case 3:
				return 'bg-green-100 border-l-4 border-green-500';
			case 4:
				return 'bg-red-100 border-l-4 border-red-500';
			default:
				return 'bg-gray-100 border-l-4 border-gray-500';
		}
	};

	const generateCalendarDays = () => {
		const days = [];

		for (let i = 0; i < firstDayOfMonth; i++) {
			days.push(
				<div
					key={`empty-${i}`}
					className='bg-accent h-48 rounded-lg shadow-inner'
				/>,
			);
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const currentDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
			const dayTasks = tasks.filter((task) => {
				const taskStartDate = task.startDate.split('T')[0];
				const taskEndDate = task.endDate.split('T')[0];
				return taskStartDate <= currentDateStr && taskEndDate >= currentDateStr;
			});

			days.push(
				<div key={day} className='h-48 overflow-hidden rounded-lg border p-2'>
					<div className='mb-1 flex items-center justify-between'>
						<span
							className={`text-sm font-medium ${new Date().getDate() === day && new Date().getMonth() === currentMonth ? 'font-bold text-blue-600' : ''}`}
						>
							{day}
						</span>
						{dayTasks.length > 0 && (
							<span className='text-muted-foreground text-xs'>
								({dayTasks.length})
							</span>
						)}
					</div>
					<div className='max-h-38 space-y-2 overflow-y-auto'>
						{dayTasks.map((task) => (
							<div
								key={task.id}
								className={`rounded p-1 text-xs ${getStatusColor(task.status.id)}`}
								title={stripHtml(task.description)}
							>
								<div className='truncate font-medium'>{task.taskName}</div>
								<div className='mt-0.5 flex items-center justify-between'>
									<span className='truncate text-xs text-gray-600'>
										{task.performer.name}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>,
			);
		}

		return days;
	};

	const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

	return (
		<div className='rounded-lg bg-white shadow'>
			<PageTitles
				title={'Календарь'}
				description={
					'Следите за сроками выполнения задач и планируйте свое время с помощью календаря.'
				}
				className={'px-4 py-2'}
			>
				<div className={'flex items-center gap-x-4'}>
					<Button
						variant={'outline'}
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
							size={'sm'}
							onClick={() => navigateMonth(-1)}
							variant={'outline'}
							className='size-8 rounded-full p-1 hover:bg-gray-100'
						>
							<ChevronLeft className='h-5 w-5' />
						</Button>
						<span className='w-34 text-center text-lg first-letter:uppercase'>
							{formatDate(currentDate)}
						</span>
						<Button
							size={'sm'}
							onClick={() => navigateMonth(1)}
							variant={'outline'}
							className='size-8 rounded-full p-1 hover:bg-gray-100'
						>
							<ChevronRight className='h-5 w-5' />
						</Button>
					</div>
				</div>
			</PageTitles>

			<div className='grid grid-cols-7 border-b border-dashed border-gray-200'>
				{weekDays.map((day) => (
					<div
						key={day}
						className='py-2 text-center text-sm font-medium text-gray-500'
					>
						{day}
					</div>
				))}
			</div>

			<div className='mt-4 grid grid-cols-7 gap-2 p-4'>
				{generateCalendarDays()}
			</div>
		</div>
	);
}
