import { CreateTaskModal, TaskCard } from '@/features/task/components';
import { useGetTasks } from '@/features/task/hooks';

import {
	ErrorBlock,
	IconNoteAdd,
	Loading,
	PageTitles,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { formatStatus } from '@/shared/lib';

export function Home() {
	const { isTasksLoading, tasks } = useGetTasks();

	if (isTasksLoading) {
		return <Loading />;
	}

	if (!tasks) {
		return <ErrorBlock />;
	}

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

			<div className={'grid grid-cols-3 gap-4 p-4'}>
				{[newTasks, inProgressTasks, completedTasks].map((taskList, index) => (
					<div className={'flex flex-col gap-y-4'} key={index}>
						{taskList.length === 0 ? (
							<p>
								Список задач со статусом "{formatStatus(index).label}" пуст.
							</p>
						) : (
							taskList.map((task) => <TaskCard task={task} key={task.id} />)
						)}
					</div>
				))}
			</div>
		</div>
	);
}
