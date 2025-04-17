import { Badge } from '@/shared/components/ui';
import { formatPriority } from '@/shared/lib';
import { IPriority } from '@/shared/types';

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
		<Badge variant={variant} className={'border-dashed border-white'}>
			{label}
		</Badge>
	) : (
		<Badge variant={variant} className={'size-5 border-dashed border-white'} />
	);
}
