import { useState } from 'react';

import { useGetProjects } from '@/features/project/hooks';
import { useGetSubordinates } from '@/features/subordinate/hooks';
import {
	CreateTaskModal,
	TaskCard,
	TasksColumnTitle,
} from '@/features/task/components';
import { TasksFilters } from '@/features/task/components/tasks-filters';
import { useGetTasks } from '@/features/task/hooks';

import {
	ErrorBlock,
	IconNoteAdd,
	Loading,
	PageTitles,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { formatStatus } from '@/shared/lib';

interface Filters {
	projectId?: string;
	performerId?: string;
	statusId?: string;
}

export function Home() {
	const [filters, setFilters] = useState<Filters>({
		statusId: undefined,
		projectId: undefined,
		performerId: undefined,
	});

	const projectId =
		filters.projectId && !isNaN(Number(filters.projectId))
			? Number(filters.projectId)
			: undefined;

	const performerId =
		filters.performerId && !isNaN(Number(filters.performerId))
			? Number(filters.performerId)
			: undefined;

	const statusId =
		filters.statusId && !isNaN(Number(filters.statusId))
			? Number(filters.statusId)
			: undefined;

	const { isTasksLoading, tasks } = useGetTasks(
		statusId,
		projectId,
		performerId,
	);
	const { projects, isProjectsLoading } = useGetProjects();
	const { subordinates, isSubordinatesLoading } = useGetSubordinates(
		0,
		undefined,
		1000,
	);

	if (isTasksLoading || isProjectsLoading || isSubordinatesLoading) {
		return <Loading />;
	}

	if (!tasks) {
		return <ErrorBlock />;
	}

	const handleProjectChange = (projectId: string) => {
		setFilters((prev) => ({
			...prev,
			projectId,
		}));
	};

	const handleSubordinateChange = (subordinateId: string) => {
		setFilters((prev) => ({
			...prev,
			performerId: subordinateId,
		}));
	};

	const handleStatusChange = (statusId: string) => {
		setFilters((prev) => ({
			...prev,
			statusId,
		}));
	};

	const newTasks = tasks.filter((task) => task.status.id === 1);
	const inProgressTasks = tasks.filter((task) => task.status.id === 2);
	const completedTasks = tasks.filter((task) => task.status.id === 3);

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
				projectId={filters.projectId}
				onProjectChange={handleProjectChange}
				subordinates={subordinates.content}
				onSubordinateChange={handleSubordinateChange}
				performerId={filters.performerId}
				statusId={filters.statusId}
				onStatusChange={handleStatusChange}
			/>

			<div className={'grid grid-cols-3 gap-4 p-4'}>
				{[newTasks, inProgressTasks, completedTasks].map((taskList, index) => (
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
								taskList.map((task) => <TaskCard task={task} key={task.id} />)
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
