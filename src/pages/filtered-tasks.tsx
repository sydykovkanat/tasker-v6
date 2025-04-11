import { useGetProjects } from '@/features/project/hooks';
import { useGetSubordinates } from '@/features/subordinate/hooks';
import { TaskCard, TasksFilters } from '@/features/task/components';
import { useGetTasks, useTasksFilters } from '@/features/task/hooks';

import { ErrorBlock, Loading, PageTitles } from '@/shared/components/shared';
import { formatStatus, safeParse } from '@/shared/lib';

interface Props {
	statusId: 1 | 2 | 3 | 4;
}

export function FilteredTasks({ statusId }: Props) {
	const {
		projectId,
		performerId,
		handleSubordinateChange,
		handleProjectChange,
	} = useTasksFilters();
	const formattedStatus = formatStatus(statusId);
	const { tasks, isTasksLoading } = useGetTasks(
		safeParse(statusId),
		safeParse(projectId),
		safeParse(performerId),
	);
	const { projects } = useGetProjects();
	const { subordinates } = useGetSubordinates(0, 1000);

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

			<TasksFilters
				onProjectChange={handleProjectChange}
				subordinates={subordinates.content}
				onSubordinateChange={handleSubordinateChange}
				projects={projects}
				projectId={projectId}
				performerId={performerId}
				isStatusDisabled={true}
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
