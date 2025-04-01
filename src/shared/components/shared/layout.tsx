import { PropsWithChildren } from 'react';

import { Sidebar } from '@/widgets/sidebar/components';

export function Layout({ children }: PropsWithChildren) {
	return (
		<main className={'flex min-h-screen'}>
			<Sidebar />

			<div className={'w-full p-4'}>{children}</div>
		</main>
	);
}
