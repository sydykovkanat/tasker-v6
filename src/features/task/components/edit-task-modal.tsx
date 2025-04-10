import { PropsWithChildren, useState } from 'react';

import { TaskForm } from '@/features/task/components';
import { useEditTask, useGetTask } from '@/features/task/hooks';
import { TaskSchemaType } from '@/features/task/schemas';

import { ErrorBlock } from '@/shared/components/shared';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui';

interface Props {
	taskId: number;
	modal?: boolean;
}

export function EditTaskModal({
	taskId,
	modal,
	children,
}: PropsWithChildren<Props>) {
	const [isOpen, setIsOpen] = useState(false);
	const { editTask, isEditTaskLoading } = useEditTask(taskId);
	const { isTaskLoading, task } = useGetTask(taskId);

	const handleEdit = (data: TaskSchemaType) => {
		editTask(data);
		setIsOpen(false);
	};

	if (!task) {
		return <ErrorBlock />;
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen} modal={modal}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className={'sm:max-w-5xl'} outsideClose={false}>
				<DialogHeader>
					<DialogTitle>Редактировать задачу</DialogTitle>

					<DialogDescription>
						Отредактируйте задачу, заполнив все необходимые поля.
					</DialogDescription>
				</DialogHeader>

				<TaskForm
					onSubmit={handleEdit}
					isLoading={isEditTaskLoading || isTaskLoading}
					defaultValues={{
						taskName: task.taskName,
						priorityId: task.priority.id.toString(),
						performerId: task.performer.id.toString(),
						departmentId: task.departmentDto.id.toString(),
						projectId: task.project?.id.toString(),
						dates: {
							from: new Date(task.startDate),
							to: new Date(task.endDate),
						},
						description: task.description,
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}
