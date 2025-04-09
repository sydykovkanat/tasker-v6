import { LoaderIcon } from 'lucide-react';

interface Props {
	absolute?: boolean;
}

export function Loading({ absolute = true }: Props) {
	return (
		<div
			className={
				absolute
					? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
					: ''
			}
		>
			<LoaderIcon className={'text-muted-foreground size-5 animate-spin'} />
		</div>
	);
}
