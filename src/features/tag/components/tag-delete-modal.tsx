import { PropsWithChildren, useState } from 'react';

import { useDeleteTag } from '@/features/tag/hooks';

import { IconCancel, IconDelete } from '@/shared/components/shared';
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
	tagId: number;
	tagName?: string;
}

export function TagDeleteModal({
	tagId,
	tagName,
	children,
}: PropsWithChildren<Props>) {
	const [isOpen, setIsOpen] = useState(false);

	const { deleteTag, isTagDeleteLoading } = useDeleteTag();

	const handleDelete = async () => {
		deleteTag(tagId);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger
				asChild
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Вы уверены, что хотите удалить тег?</DialogTitle>

					<DialogDescription>
						Это действие нельзя отменить. Вы уверены, что хотите удалить тег "
						{tagName}"?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<DialogClose asChild disabled={isTagDeleteLoading}>
						<Button
							disabled={isTagDeleteLoading}
							size={'lg'}
							variant={'outline'}
						>
							<IconCancel />
							Закрыть
						</Button>
					</DialogClose>

					<Button
						onClick={handleDelete}
						loading={isTagDeleteLoading}
						size={'lg'}
					>
						<IconDelete />
						Да, удалить
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
