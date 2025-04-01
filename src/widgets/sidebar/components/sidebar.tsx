import { Link } from 'react-router-dom';

import { SidebarNav, SidebarUser } from '@/widgets/sidebar/components';

import { IconLogo } from '@/shared/components/shared';

export function Sidebar() {
	return (
		<aside
			className={
				'flex w-full max-w-xs flex-col justify-between border-r border-dashed p-4'
			}
		>
			<section>
				<Link to={'/'} className={'mb-4 flex items-center gap-x-2'}>
					<IconLogo className={'size-9'} />

					<div className={'leading-none'}>
						<h3 className={'font-medium'}>Таскер</h3>
						<p className={'text-muted-foreground text-xs'}>
							Управление задачами и проектами
						</p>
					</div>
				</Link>

				<SidebarNav />
			</section>

			<SidebarUser />
		</aside>
	);
}
