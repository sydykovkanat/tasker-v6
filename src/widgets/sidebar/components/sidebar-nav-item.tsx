import { Link } from 'react-router-dom';

import { buttonVariants } from '@/shared/components/ui';
import { IRoute } from '@/shared/config';
import { cn } from '@/shared/utils';

interface Props {
	route: IRoute;
	isActive?: boolean;
}

export function SidebarNavItem({ route, isActive }: Props) {
	return (
		<li>
			<Link
				to={route.url}
				className={cn(
					buttonVariants({ variant: 'ghost', size: 'lg' }),
					'text-muted-foreground w-full justify-start',
					{
						'bg-accent text-foreground': isActive,
					},
				)}
			>
				{route.icon ? (
					<route.icon className={'size-4.5 text-inherit'} />
				) : (
					<svg />
				)}
				{route.label}
			</Link>
		</li>
	);
}
