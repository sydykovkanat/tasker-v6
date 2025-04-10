import { useGetProjects } from '@/features/project/hooks';
import { useGetSubordinates } from '@/features/subordinate/hooks';
import {
	CreateTaskModal,
	TaskCard,
	TasksColumnTitle,
	TasksFilters,
} from '@/features/task/components';
import { useGetTasks, useTasksFilters } from '@/features/task/hooks';

import {
	ErrorBlock,
	IconNoteAdd,
	Loading,
	PageTitles,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { formatStatus, safeParse } from '@/shared/lib';

export function Home() {
	const {
		handleProjectChange,
		handleStatusChange,
		handleSubordinateChange,
		performerId,
		projectId,
		statusId,
	} = useTasksFilters();

	const { isTasksLoading, tasks } = useGetTasks(
		safeParse(statusId),
		safeParse(projectId),
		safeParse(performerId),
	);
	const { projects, isProjectsLoading } = useGetProjects();
	const { subordinates, isSubordinatesLoading } = useGetSubordinates(0, 1000);

	if (isTasksLoading || isProjectsLoading || isSubordinatesLoading) {
		return <Loading />;
	}

	if (!tasks) {
		return <ErrorBlock />;
	}

	const newTasks = tasks.filter((task) => task.status.id === 1);
	const inProgressTasks = tasks.filter((task) => task.status.id === 2);
	const completedTasks = tasks.filter((task) => task.status.id === 3);
	const formattedStatus = formatStatus(parseInt(statusId || '0'));

	console.log(statusId);

	return (
		<div>
			<PageTitles
				title={'Все задачи'}
				description={
					'Список всех ваших задач с возможностью фильтрации по статусу, приоритету и проекту.'
				}
				className={'px-4 py-2'}
			>
				<CreateTaskModal>
					<Button size={'lg'}>
						<IconNoteAdd />
						Создать задачу
					</Button>
				</CreateTaskModal>
			</PageTitles>

			<TasksFilters
				projects={projects}
				projectId={projectId}
				onProjectChange={handleProjectChange}
				subordinates={subordinates.content}
				onSubordinateChange={handleSubordinateChange}
				performerId={performerId}
				statusId={statusId}
				onStatusChange={handleStatusChange}
			/>

			{statusId !== 'all' ? (
				<div className={'p-4'}>
					<h5 className={'mb-4 text-lg'}>
						Задачи со статусом "{formattedStatus.label}"
						{tasks.length > 0 && ` (${tasks.length})`}
					</h5>

					<div className='columns-2 gap-4'>
						{tasks.map((task) => (
							<div key={task.id} className='mb-4 break-inside-avoid'>
								<TaskCard task={task} />
							</div>
						))}
					</div>
				</div>
			) : (
				<div className={'grid grid-cols-3 gap-4 p-4'}>
					{[newTasks, inProgressTasks, completedTasks].map(
						(taskList, index) => (
							<div>
								<TasksColumnTitle
									status={formatStatus(index + 1).label}
									count={taskList.length}
								/>

								<div className={'flex flex-col gap-y-4'} key={index}>
									{taskList.length === 0 ? (
										<p className={'text-muted-foreground mt-4 text-center'}>
											Список задач со статусом "{formatStatus(index + 1).label}"
											пуст.
										</p>
									) : (
										taskList.map((task) => (
											<TaskCard task={task} key={task.id} />
										))
									)}
								</div>
							</div>
						),
					)}
				</div>
			)}
		</div>
	);
}
