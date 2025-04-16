import { PropsWithChildren, useState } from 'react';

import { TaskForm } from '@/features/task/components';
import { useCreateTask } from '@/features/task/hooks';
import { TaskSchemaType } from '@/features/task/schemas';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui';

export function CreateTaskModal({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false);
	const { createTask, isCreateTaskLoading } = useCreateTask();

	const handleCreate = (data: TaskSchemaType) => {
		createTask(data);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className={'sm:max-w-5xl'} outsideClose={false}>
				<DialogHeader>
					<DialogTitle>Новая задача</DialogTitle>

					<DialogDescription>
						Создайте новую задачу, заполнив все необходимые поля.
					</DialogDescription>
				</DialogHeader>

				<TaskForm
					type={'create'}
					onSubmit={handleCreate}
					isLoading={isCreateTaskLoading}
				/>
			</DialogContent>
		</Dialog>
	);
}
