import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconArrowLeft } from '@/shared/components/shared/icons';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/utils';

interface Props {
	title: string;
	description: string;
	className?: string;
	isBackButton?: boolean;
}

export function PageTitles({
	title,
	description,
	className,
	children,
	isBackButton = false,
}: PropsWithChildren<Props>) {
	const navigate = useNavigate();

	return (
		<div
			className={cn(
				'flex items-center justify-between border-b border-dashed',
				className,
			)}
		>
			<div className={'flex items-center gap-x-2'}>
				{isBackButton && (
					<Button
						onClick={() => {
							navigate(-1);
						}}
						size={'icon'}
						variant={'outline'}
						className={'size-10 rounded-full'}
					>
						<IconArrowLeft className={'size-4'} />
					</Button>
				)}
				<div>
					<h1 className={'text-2xl font-medium'}>{title}</h1>

					<p className={'text-muted-foreground line-clamp-1'}>{description}</p>
				</div>
			</div>

			{children}
		</div>
	);
}
