import { PropsWithChildren } from 'react';

import { ApprovesCard } from '@/features/approves/components';
import { useGetApproves } from '@/features/approves/hooks';

import { Loading } from '@/shared/components/shared';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui';

export function ApprovesModal({ children }: PropsWithChildren) {
	const { approves, isLoadingApproves } = useGetApproves();

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className={'sm:max-w-2xl'}>
				<DialogHeader>
					<DialogTitle>Список согласований</DialogTitle>

					<DialogDescription>
						Здесь вы можете просмотреть все согласования, которые вам необходимо
						выполнить.
					</DialogDescription>
				</DialogHeader>

				<div className={'relative'}>
					{isLoadingApproves ? (
						<Loading />
					) : (
						approves &&
						(approves.length === 0 ? (
							<p className={'text-muted-foreground text-center'}>
								Нет согласований, которые вам необходимо выполнить.
							</p>
						) : (
							approves.map((approve) => (
								<ApprovesCard key={approve.id} approve={approve} />
							))
						))
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
