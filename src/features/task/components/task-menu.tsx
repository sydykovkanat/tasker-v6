import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store';
import { useDeleteTask } from '@/features/task/hooks';
import { ITask } from '@/features/task/types';

import { IconArrowRight, IconDelete } from '@/shared/components/shared';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/shared/components/ui';

interface Props {
	task: ITask;
}

export function TaskMenu({ task, children }: PropsWithChildren<Props>) {
	const { deleteTask, isDeleteTaskLoading } = useDeleteTask();

	const navigate = useNavigate();
	const user = useAuthStore((state) => state.user);
	const isAccess =
		task.performer.id === user?.id ||
		task.author.id === user?.id ||
		user?.roles.includes('ADMIN');

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={() => navigate(`/tasks/${task.id}`)}>
					<IconArrowRight />
					Перейти к задаче
				</ContextMenuItem>

				{isAccess && (
					<ContextMenuItem
						onClick={() => deleteTask(task.id)}
						disabled={isDeleteTaskLoading}
					>
						<IconDelete />
						Удалить
					</ContextMenuItem>
				)}
			</ContextMenuContent>
		</ContextMenu>
	);
}
