import { LoaderIcon } from 'lucide-react';

export function Loading() {
	return (
		<div
			className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}
		>
			<LoaderIcon className={'text-muted-foreground size-5 animate-spin'} />
		</div>
	);
}
