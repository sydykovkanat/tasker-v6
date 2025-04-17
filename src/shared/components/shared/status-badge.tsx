import { Badge } from '@/shared/components/ui';
import { formatStatus } from '@/shared/lib';
import { IStatus } from '@/shared/types';

interface Props {
	status: IStatus;
}

export function StatusBadge({ status }: Props) {
	const { label } = formatStatus(status.id);

	const variant =
		status.id === 1
			? 'blue'
			: status.id === 2
				? 'info'
				: status.id === 3
					? 'success'
					: 'destructive';

	return (
		<Badge variant={variant} className={'border-dashed border-white'}>
			{label}
		</Badge>
	);
}
