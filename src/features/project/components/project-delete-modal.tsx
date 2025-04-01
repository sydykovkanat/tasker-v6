import { PropsWithChildren, useState } from 'react';

import { useDeleteProject } from '@/features/project/hooks';

import { IconCancel, IconFolderRemove } from '@/shared/components/shared';
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
	projectId: number;
}

export function ProjectDeleteModal({
	projectId,
	children,
}: PropsWithChildren<Props>) {
	const [isOpen, setIsOpen] = useState(false);

	const { deleteProject, isProjectDeleteLoading } = useDeleteProject();

	const handleDelete = async () => {
		deleteProject(projectId);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Вы уверены, что хотите удалить проект?</DialogTitle>

					<DialogDescription>
						Это действие нельзя отменить. Вы уверены, что хотите удалить проект?
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button
						onClick={handleDelete}
						loading={isProjectDeleteLoading}
						size={'lg'}
					>
						<IconFolderRemove />
						Да, удалить
					</Button>

					<DialogClose asChild disabled={isProjectDeleteLoading}>
						<Button
							loading={isProjectDeleteLoading}
							size={'lg'}
							variant={'outline'}
						>
							<IconCancel />
							Закрыть
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
