import React, { SVGProps } from 'react';

import {
	CompletedIcon,
	InProgressIcon,
	NewTaskIcon,
	RejectedIcon,
} from '@/shared/components/shared/icons';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/components/ui';
import { formatStatus } from '@/shared/lib';
import { IStatus } from '@/shared/types';
import { cn } from '@/shared/utils';

interface Props {
	status: IStatus;
	className?: string;
}

const statusIconMap: Record<number, React.FC<SVGProps<SVGSVGElement>>> = {
	1: NewTaskIcon,
	2: InProgressIcon,
	3: CompletedIcon,
	4: RejectedIcon,
};

export function StatusBadge({ status, className }: Props) {
	const Icon = statusIconMap[status.id];
	const formattedStatus = formatStatus(status.id);

	if (!Icon) return null;

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Icon className={cn('size-5', className)} />
				</TooltipTrigger>

				<TooltipContent className={'bg-background text-foreground border'}>
					{formattedStatus.label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
