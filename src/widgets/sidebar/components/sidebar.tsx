import { Link } from 'react-router-dom';

import { SidebarNav, SidebarUser } from '@/widgets/sidebar/components';

export function Sidebar() {
	return (
		<aside
			className={
				'flex max-h-screen w-full max-w-xs flex-col justify-between border-r border-dashed p-4'
			}
		>
			<section>
				<div className={'flex items-center justify-between gap-x-4'}>
					<Link to={'/'} className={'mb-4 flex items-center gap-x-2'}>
						{/*<IconLogo className={'size-9'} />*/}
						<img
							src={'/logo.jpg'}
							className={'size-9 rounded-sm'}
							alt={'logo'}
						/>

						<div className={'leading-none'}>
							<h3 className={'font-medium'}>Таскер</h3>
							<p className={'text-muted-foreground text-xs'}>
								Управление задачами и проектами
							</p>
						</div>
					</Link>

					{/*<ThemeSwitcher />*/}
				</div>

				<SidebarNav />
			</section>

			<SidebarUser />
		</aside>
	);
}
