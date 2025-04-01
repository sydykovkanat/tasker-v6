import { Link } from 'react-router-dom';

import { IconLogo } from '@/shared/components/shared';
import { SidebarNav } from '@/widgets/sidebar/components';

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
						<h3 className={'font-medium'}>Tasker</h3>
						<p className={'text-muted-foreground text-xs'}>
							Управление задачами и проектами
						</p>
					</div>
				</Link>

				<SidebarNav />
			</section>

			<p className={'text-muted-foreground mt-4 text-xs'}>v3.0.0</p>
		</aside>
	);
}
