import { PropsWithChildren } from 'react';

import { Sidebar } from '@/widgets/sidebar/components';

import { ScrollArea } from '@/shared/components/ui';

export function Layout({ children }: PropsWithChildren) {
	return (
		<main className={'flex min-h-screen'}>
			<Sidebar />

			<ScrollArea className={'relative h-screen w-full'}>
				<div className={'w-full'}>{children}</div>
			</ScrollArea>
		</main>
	);
}
