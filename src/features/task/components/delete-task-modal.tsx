import { PropsWithChildren } from 'react';

import { useDeleteTask } from '@/features/task/hooks';

import { IconCancel, IconFolderRemove } from '@/shared/components/shared';
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui';

interface Props {
	taskId: number;
}

export function DeleteTaskModal({
	taskId,
	children,
}: PropsWithChildren<Props>) {
	const { isDeleteTaskLoading, deleteTask } = useDeleteTask();

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Вы уверены, что хотите удалить задачу?</DialogTitle>

					<DialogDescription>
						Это действие нельзя отменить. Вы уверены, что хотите удалить задачу?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild disabled={isDeleteTaskLoading}>
						<Button
							disabled={isDeleteTaskLoading}
							size={'lg'}
							variant={'outline'}
						>
							<IconCancel />
							Закрыть
						</Button>
					</DialogClose>

					<DialogClose asChild>
						<Button
							onClick={() => deleteTask(taskId)}
							loading={isDeleteTaskLoading}
							size={'lg'}
						>
							<IconFolderRemove />
							Да, удалить
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
