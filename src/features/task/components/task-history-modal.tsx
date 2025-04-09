import { PropsWithChildren, useState } from 'react';

import { useGetTaskHistory } from '@/features/history/hooks';

import { IconCancel, Loading } from '@/shared/components/shared';
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui';

interface Props {
	taskId: number;
}

export function TaskHistoryModal({
	taskId,
	children,
}: PropsWithChildren<Props>) {
	const [isOpen, setIsOpen] = useState(false);
	const { history, isHistoryLoading } = useGetTaskHistory(taskId, isOpen);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>История задачи</DialogTitle>

					<DialogDescription>
						Подробный список изменений задачи
					</DialogDescription>
				</DialogHeader>

				<div>
					{isHistoryLoading ? (
						<Loading />
					) : history && history.length === 0 ? (
						<p className={'text-muted-foreground text-center'}>
							История изменений задачи отсутствует
						</p>
					) : (
						history && history.map((item) => <p>{item.changeReason}</p>)
					)}
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button size={'lg'} variant={'outline'}>
							<IconCancel />
							Закрыть
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
