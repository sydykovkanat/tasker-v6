import { PropsWithChildren } from 'react';

import { cn } from '@/shared/utils';

interface Props {
	title: string;
	description: string;
	className?: string;
}

export function PageTitles({
	title,
	description,
	className,
	children,
}: PropsWithChildren<Props>) {
	return (
		<div
			className={cn(
				'flex items-center justify-between border-b border-dashed',
				className,
			)}
		>
			<div>
				<h1 className={'text-2xl font-medium'}>{title}</h1>

				<p className={'text-muted-foreground'}>{description}</p>
			</div>

			{children}
		</div>
	);
}
