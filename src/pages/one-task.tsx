import { useParams } from 'react-router-dom';

import {
	TaskAssignedCard,
	TaskHistoryModal,
	TaskInfo,
} from '@/features/task/components';
import { useGetTask } from '@/features/task/hooks';

import {
	ErrorBlock,
	IconHistory,
	IconNoteAdd,
	Loading,
	PageTitles,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';

export function OneTask() {
	const { id } = useParams<{ id: string }>() as { id: string };
	const { isTaskLoading, task } = useGetTask(parseInt(id));

	if (isTaskLoading) {
		return <Loading />;
	}

	if (!task) {
		return <ErrorBlock />;
	}

	return (
		<main>
			<PageTitles
				title={task.taskName}
				description={`Подробная информация задачи: ${task.taskName}`}
				className={'px-4 py-2'}
				isBackButton
			>
				<TaskHistoryModal taskId={task.id}>
					<Button size={'lg'} variant={'outline'}>
						<IconHistory />
						История изменений
					</Button>
				</TaskHistoryModal>
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
						<Button size={'lg'}>
							<IconNoteAdd />
							Создать подзадачу
						</Button>
					</PageTitles>

					<div>{/* Здесь будет список подзадач */}</div>
				</div>
			</div>
		</main>
	);
}
