import { useLocation } from 'react-router-dom';

import { SidebarNavItem } from '@/widgets/sidebar/components';

import { routes } from '@/shared/config';

export function SidebarNav() {
	const { pathname } = useLocation();

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
