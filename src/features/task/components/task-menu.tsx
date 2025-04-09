import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { ITask } from '@/features/task/types';

import { IconArrowRight } from '@/shared/components/shared';
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
	const navigate = useNavigate();

	return (
		<ContextMenu>
			<ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={() => navigate(`/tasks/${task.id}`)}>
					<IconArrowRight />
					Перейти к задаче
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
