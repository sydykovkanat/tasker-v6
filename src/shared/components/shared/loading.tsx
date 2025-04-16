import { LoaderIcon } from 'lucide-react';

import { cn } from '@/shared/utils';

interface Props {
	absolute?: boolean;
	className?: string;
}

export function Loading({ absolute = true, className }: Props) {
	return (
		<div
			className={cn(
				'text-muted-foreground',
				{
					'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2':
						absolute,
				},
				className,
			)}
		>
			<LoaderIcon className={'size-5 animate-spin text-inherit'} />
		</div>
	);
}
