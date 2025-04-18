import React, { cloneElement, isValidElement, PropsWithChildren } from 'react';

import { useEditTaskStatus } from '@/features/task/hooks';

import {
	IconCircleArrowDown,
	IconCircleArrowRight,
	IconCircleArrowUp,
} from '@/shared/components/shared';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui';

interface LoadingChildProps {
	loading?: boolean;
}

type Props = {
	taskId: number;
	currentStatusId?: number;
	children: React.ReactElement<LoadingChildProps>;
};

export function ChangeStatusMenu({
	taskId,
	currentStatusId,
	children,
}: PropsWithChildren<Props>) {
	const { editTaskStatus, isEditTaskStatusLoading } = useEditTaskStatus();

	const triggerElement = isValidElement(children)
		? cloneElement(children, { loading: isEditTaskStatusLoading })
		: children;

	const isCompleted = currentStatusId === 3;
	const isProgress = currentStatusId === 2;
	const isNew = currentStatusId === 1;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>

			<DropdownMenuContent>
				{!isNew && !isCompleted && (
					<DropdownMenuItem
						disabled={isEditTaskStatusLoading}
						onClick={() => editTaskStatus({ taskId, statusId: 1 })}
					>
						<IconCircleArrowUp />
						Перевести в новое
					</DropdownMenuItem>
				)}

				{!isProgress && (
					<DropdownMenuItem
						disabled={isEditTaskStatusLoading}
						onClick={() => editTaskStatus({ taskId, statusId: 2 })}
					>
						<IconCircleArrowRight />
						Перевести в работу
					</DropdownMenuItem>
				)}

				{!isCompleted && (
					<DropdownMenuItem
						disabled={isEditTaskStatusLoading}
						onClick={() => editTaskStatus({ taskId, statusId: 3 })}
					>
						<IconCircleArrowDown />
						Завершить задачу
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
