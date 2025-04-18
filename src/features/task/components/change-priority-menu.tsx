import React, { cloneElement, isValidElement, PropsWithChildren } from 'react';

import { useEditTaskPriority } from '@/features/task/hooks';

import { IconCircle } from '@/shared/components/shared';
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
	currentPriorityId?: number;
	children: React.ReactElement<LoadingChildProps>;
};

export function ChangePriorityMenu({
	taskId,
	currentPriorityId,
	children,
}: PropsWithChildren<Props>) {
	const { editTaskPriority, isEditTaskPriorityLoading } = useEditTaskPriority();

	const triggerElement = isValidElement(children)
		? cloneElement(children, { loading: isEditTaskPriorityLoading })
		: children;

	const isLow = currentPriorityId === 1;
	const isMiddle = currentPriorityId === 2;
	const isHigh = currentPriorityId === 3;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>

			<DropdownMenuContent>
				{!isLow && (
					<DropdownMenuItem
						disabled={isEditTaskPriorityLoading}
						onClick={() => editTaskPriority({ taskId: taskId, priorityId: 1 })}
					>
						<IconCircle className={'text-green-500'} />
						Низкий
					</DropdownMenuItem>
				)}

				{!isMiddle && (
					<DropdownMenuItem
						disabled={isEditTaskPriorityLoading}
						onClick={() => editTaskPriority({ taskId: taskId, priorityId: 2 })}
					>
						<IconCircle className={'text-yellow-500'} />
						Средний
					</DropdownMenuItem>
				)}

				{!isHigh && (
					<DropdownMenuItem
						disabled={isEditTaskPriorityLoading}
						onClick={() => editTaskPriority({ taskId: taskId, priorityId: 3 })}
					>
						<IconCircle className={'text-red-500'} />
						Высокий
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
