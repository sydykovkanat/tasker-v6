import { useParams } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store';
import {
	CreateSubtaskModal,
	EditTaskModal,
	TaskAssignedCard,
	TaskCard,
	TaskHistoryModal,
	TaskInfo,
} from '@/features/task/components';
import { useGetTask, useGetTaskSubtasks } from '@/features/task/hooks';

import {
	ErrorBlock,
	IconHistory,
	IconNoteAdd,
	IconNoteEdit,
	Loading,
	PageTitles,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';

export function OneTask() {
	const { id } = useParams<{ id: string }>() as { id: string };
	const { isTaskLoading, task } = useGetTask(parseInt(id));
	const { subtasks, isSubtasksLoading } = useGetTaskSubtasks(parseInt(id));
	const user = useAuthStore((state) => state.user);

	if (isTaskLoading) {
		return <Loading />;
	}

	if (!task) {
		return <ErrorBlock />;
	}

	const isAccess =
		user?.roles.includes('ADMIN') ||
		task.performer.id === user?.id ||
		task.author.id === user?.id;

	return (
		<main>
			<PageTitles
				title={task.taskName}
				description={`Подробная информация задачи: ${task.taskName}`}
				className={'px-4 py-2'}
				isBackButton
			>
				<div className={'flex items-center gap-x-2'}>
					{isAccess && (
						<EditTaskModal taskId={task.id}>
							<Button size={'lg'} variant={'outline'}>
								<IconNoteEdit />
								Редактировать
							</Button>
						</EditTaskModal>
					)}

					<TaskHistoryModal taskId={task.id}>
						<Button size={'lg'} variant={'outline'}>
							<IconHistory />
							История изменений
						</Button>
					</TaskHistoryModal>
				</div>
			</PageTitles>

			<div className={'flex h-full min-h-screen'}>
				<div className={'flex-1 space-y-4 p-4'}>
					<TaskAssignedCard author={task.author} performer={task.performer} />

					<TaskInfo task={task} />
				</div>

				<div className={'flex-1 border-l border-dashed'}>
					<PageTitles
						title={'Подзадачи'}
						description={'Список подзадач'}
						className={'px-4 py-2'}
					>
						<CreateSubtaskModal taskId={parseInt(id)}>
							<Button size={'lg'}>
								<IconNoteAdd />
								Создать подзадачу
							</Button>
						</CreateSubtaskModal>
					</PageTitles>

					<div className={'relative flex min-h-[80%] flex-col gap-y-4 p-4'}>
						{isSubtasksLoading ? (
							<Loading />
						) : !subtasks ? (
							<ErrorBlock />
						) : subtasks.length === 0 ? (
							<p className={'text-muted-foreground text-center'}>
								У задачи нет подзадач. Вы можете создать их, нажав на кнопку
								"Создать подзадачу" выше.
							</p>
						) : (
							subtasks.map((subtasks) => (
								<TaskCard key={subtasks.id} task={subtasks} />
							))
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
