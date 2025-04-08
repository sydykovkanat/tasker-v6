import { useAuthStore } from '@/features/auth/store';
import { NotificationModal } from '@/features/notification/components';

import {
	IconLogout,
	IconMoreVertical,
	IconNotification,
} from '@/shared/components/shared';
import {
	Avatar,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/shared/components/ui';

export function SidebarUser() {
	const { user, logout } = useAuthStore();

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button
					size={'lg'}
					variant={'ghost'}
					className={'h-auto w-full justify-start rounded-xl p-2'}
				>
					<div className={'flex w-full items-center justify-between'}>
						<div className={'flex items-center gap-x-2'}>
							<Avatar src={user?.avatar} fallback={user?.name} />

							<div className={'text-left'}>
								<h5>{user?.name.split(' ').slice(0, 2).join(' ')}</h5>
								<p className={'text-muted-foreground font-normal'}>
									{user?.email}
								</p>
							</div>
						</div>

						<IconMoreVertical className={'text-muted-foreground mr-2 size-6'} />
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side={'top'} className={'w-[300px]'}>
				<Button
					variant={'ghost'}
					onClick={logout}
					className={'w-full justify-start font-normal'}
				>
					<IconLogout />
					Выйти
				</Button>

				<NotificationModal>
					<Button
						variant={'ghost'}
						className={'w-full justify-start font-normal'}
					>
						<IconNotification />
						Уведомления
					</Button>
				</NotificationModal>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
