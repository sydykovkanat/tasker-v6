import { Badge } from '@/shared/components/ui';
import { formatPriority } from '@/shared/lib';
import { IPriority } from '@/shared/types';
import { cn } from '@/shared/utils';

interface Props {
	priority: IPriority;
	full?: boolean;
}

export function PriorityBadge({ priority, full = true }: Props) {
	const { label } = formatPriority(priority.id);

	const variant =
		priority.id === 1
			? 'success'
			: priority.id === 2
				? 'info'
				: priority.id === 3
					? 'destructive'
					: 'default';

	return full ? (
		<Badge variant={variant} className={'border-background border-dashed'}>
			{label}
		</Badge>
	) : (
		<div
			className={cn(
				'flex size-3 items-center justify-center rounded-full border',
				{
					'border-green-500': priority.id === 1,
					'border-yellow-500': priority.id === 2,
					'border-destructive': priority.id === 3,
					'border-muted': priority.id === 4,
				},
			)}
		>
			<Badge variant={variant} className={'border-background size-2.5 p-0'} />
		</div>
	);
}
