import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { API_AVATAR_URL } from '@/shared/constants';
import { cn } from '@/shared/utils';

function Avatar({
	src,
	className,
	fallback,
	fallbackClassName,
}: {
	src?: string | null;
	className?: string;
	fallbackClassName?: string;
	fallback?: string;
}) {
	return (
		<AvatarPrimitive.Root
			data-slot='avatar'
			className={cn(
				'relative flex size-12 shrink-0 overflow-hidden rounded-full border border-dashed',
				className,
			)}
		>
			<AvatarPrimitive.Image
				data-slot='avatar-image'
				className={cn('aspect-square size-full object-cover')}
				src={`${API_AVATAR_URL}/${src}`}
			/>
			<AvatarPrimitive.Fallback
				data-slot='avatar-fallback'
				className={cn(
					'bg-muted flex size-full items-center justify-center rounded-full uppercase',
					fallbackClassName,
				)}
			>
				{fallback
					?.split(' ')
					.map((name) => name[0])
					.slice(0, 2)}
			</AvatarPrimitive.Fallback>
		</AvatarPrimitive.Root>
	);
}

export { Avatar };
