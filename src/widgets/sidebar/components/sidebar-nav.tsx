import { useLocation } from 'react-router-dom';

import { ApprovesModal } from '@/features/approves/components';
import { useGetApprovesCount } from '@/features/approves/hooks';
import { CreateTaskModal } from '@/features/task/components';

import { SidebarNavItem } from '@/widgets/sidebar/components';

import { IconInformationCircle, IconNoteAdd } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { routes } from '@/shared/config';

export function SidebarNav() {
	const { pathname } = useLocation();
	const { approvesCount } = useGetApprovesCount();

	return (
		<nav>
			<ul className={'flex flex-col gap-y-2'}>
				<CreateTaskModal>
					<Button variant={'ghost'} size={'lg'} className={'justify-start'}>
						<IconNoteAdd />
						Создать задачу
					</Button>
				</CreateTaskModal>

				<ApprovesModal>
					<Button variant={'ghost'} size={'lg'} className={'justify-start'}>
						<IconInformationCircle />
						Согласования
						<span className={'text-muted-foreground'}>({approvesCount})</span>
					</Button>
				</ApprovesModal>

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
