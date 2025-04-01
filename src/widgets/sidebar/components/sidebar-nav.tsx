'use client';

import { usePathname } from 'next/navigation';

import { routes } from '@/shared/config';
import { SidebarNavItem } from '@/widgets/sidebar/components';

export function SidebarNav() {
	const pathname = usePathname();

	return (
		<nav>
			<ul className={'flex flex-col gap-y-2'}>
				{routes.map((route) => (
					<SidebarNavItem
						key={route.url}
						route={route}
						isActive={pathname === route.url}
					/>
				))}
			</ul>
		</nav>
	);
}
