import { AnimatePresence, motion } from 'framer-motion';

import { useGetProjects } from '@/features/project/hooks';
import { useGetSubordinates } from '@/features/subordinate/hooks';
import {
	CreateTaskModal,
	TableTasks,
	TableViewModeSwitcher,
	TaskCard,
	TasksColumnTitle,
	TasksFilters,
} from '@/features/task/components';
import { useGetTasks, useTasksFilters } from '@/features/task/hooks';
import { useTaskStore } from '@/features/task/store';

import {
	ErrorBlock,
	IconNoteAdd,
	Loading,
	PageTitles,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { formatStatus, safeParse } from '@/shared/lib';

export function Home() {
	const viewMode = useTaskStore((state) => state.viewMode);
	const {
		handleProjectChange,
		handleStatusChange,
		handleSubordinateChange,
		handleQueryChange,
		performerId,
		projectId,
		statusId,
		query,
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

	const sortedTasks = tasks.sort(
		(a, b) =>
			new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
	);

	const newTasks = tasks
		.filter((task) => task.status.id === 1)
		.sort(
			(a, b) =>
				new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
		);
	const inProgressTasks = tasks
		.filter((task) => task.status.id === 2)
		.sort(
			(a, b) =>
				new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
		);
	const completedTasks = tasks
		.filter((task) => task.status.id === 3)
		.sort(
			(a, b) =>
				new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
		);

	const formattedStatus = formatStatus(parseInt(statusId || '0'));

	return (
		<div>
			<PageTitles
				title={'Все задачи'}
				description={
					'Список всех ваших задач с возможностью фильтрации по статусу, приоритету и проекту.'
				}
				className={'px-4 py-2'}
			>
				<div className={'flex items-center gap-x-4'}>
					<TableViewModeSwitcher />

					<CreateTaskModal>
						<Button size={'lg'}>
							<IconNoteAdd />
							Создать задачу
						</Button>
					</CreateTaskModal>
				</div>
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
				query={query}
				onQueryChange={handleQueryChange}
			/>

			{viewMode === 'kanban' ? (
				statusId !== 'all' ? (
					<div className={'p-4'}>
						<h5 className={'mb-4 flex items-center gap-x-2 text-lg'}>
							<span>Задачи со статусом "{formattedStatus.label}"</span>

							<span className={'text-muted-foreground'}>
								({sortedTasks.length})
							</span>
						</h5>

						<AnimatePresence mode={'popLayout'}>
							<div className='columns-2 gap-4'>
								{sortedTasks.length === 0 ? (
									<p
										className={
											'text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
										}
									>
										Список задач со статусом "{formattedStatus.label}" пуст.
									</p>
								) : (
									sortedTasks.map((task) => (
										<div key={task.id} className='mb-4 break-inside-avoid'>
											<motion.div
												key={task.id}
												layout
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0, scale: 0.95 }}
												transition={{ duration: 0.3 }}
											>
												<TaskCard task={task} />
											</motion.div>
										</div>
									))
								)}
							</div>
						</AnimatePresence>
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

									<AnimatePresence mode={'popLayout'}>
										<div className={'flex flex-col gap-y-4'} key={index}>
											{taskList.length === 0 ? (
												<p className={'text-muted-foreground mt-4 text-center'}>
													Список задач со статусом "
													{formatStatus(index + 1).label}" пуст.
												</p>
											) : (
												taskList.map((task) => (
													<motion.div
														key={task.id}
														layout
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0, scale: 0.95 }}
														transition={{ duration: 0.3 }}
													>
														<TaskCard task={task} />
													</motion.div>
												))
											)}
										</div>
									</AnimatePresence>
								</div>
							),
						)}
					</div>
				)
			) : (
				<div className={'p-4 pt-2 pb-0'}>
					<TableTasks tasks={tasks} />
				</div>
			)}
		</div>
	);
}
