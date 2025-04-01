import { useAuthStore } from '@/features/auth/store';

import { IconLogout, IconMoreVertical } from '@/shared/components/shared';
import {
	Avatar,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui';

export function SidebarUser() {
	const { user, logout } = useAuthStore();

	return (
		<DropdownMenu>
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
				<DropdownMenuItem onClick={logout}>
					<IconLogout />
					Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
