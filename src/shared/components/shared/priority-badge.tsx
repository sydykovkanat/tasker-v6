import { Badge } from '@/shared/components/ui';
import { formatPriority } from '@/shared/lib';
import { IPriority } from '@/shared/types';

interface Props {
	priority: IPriority;
}

export function PriorityBadge({ priority }: Props) {
	const { label } = formatPriority(priority.id);

	const variant =
		priority.id === 1
			? 'success'
			: priority.id === 2
				? 'info'
				: priority.id === 3
					? 'destructive'
					: 'default';

	return (
		<Badge variant={variant} className={'border-border'}>
			{label}
		</Badge>
	);
}
