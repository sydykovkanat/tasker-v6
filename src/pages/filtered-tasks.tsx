import { TaskCard } from '@/features/task/components';
import { useGetTasks } from '@/features/task/hooks';

import { ErrorBlock, Loading, PageTitles } from '@/shared/components/shared';
import { formatStatus } from '@/shared/lib';

interface Props {
	status: 1 | 2 | 3 | 4;
}

export function FilteredTasks({ status }: Props) {
	const formattedStatus = formatStatus(status);
	const { tasks, isTasksLoading } = useGetTasks(status);

	if (isTasksLoading) {
		return <Loading />;
	}

	if (!tasks) {
		return <ErrorBlock />;
	}

	return (
		<div>
			<PageTitles
				title={`Задачи со статусом "${formattedStatus.label}"`}
				description={`Здесь вы можете просмотреть задачи, которые имеют статус "${formattedStatus.label}"`}
				className={'px-4 py-2'}
			/>

			<section className='columns-2 gap-4 p-4'>
				{tasks.length === 0 ? (
					<p
						className={
							'text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
						}
					>
						Список задач со статусом "{formattedStatus.label}" пуст.
					</p>
				) : (
					tasks.map((task) => (
						<div key={task.id} className='mb-4 break-inside-avoid'>
							<TaskCard task={task} />
						</div>
					))
				)}
			</section>
		</div>
	);
}
