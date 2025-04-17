import { PropsWithChildren, useState } from 'react';

import { TaskForm } from '@/features/task/components';
import { useCreateSubtask } from '@/features/task/hooks';
import { TaskSchemaType } from '@/features/task/schemas';

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
}

export function CreateSubtaskModal({
	taskId,
	children,
}: PropsWithChildren<Props>) {
	const [isOpen, setIsOpen] = useState(false);
	const { createSubtask, isCreateSubtaskLoading } = useCreateSubtask(taskId);

	const handleCreate = (data: TaskSchemaType) => {
		createSubtask(data);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className={'sm:max-w-5xl'} outsideClose={false}>
				<DialogHeader>
					<DialogTitle>Новая подзадача</DialogTitle>

					<DialogDescription>
						Создайте новую подзадачу, заполнив все необходимые поля.
					</DialogDescription>
				</DialogHeader>

				<TaskForm
					type={'create'}
					onSubmit={handleCreate}
					isLoading={isCreateSubtaskLoading}
				/>
			</DialogContent>
		</Dialog>
	);
}
