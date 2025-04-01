import { PropsWithChildren, useState } from 'react';

import { ProjectForm } from '@/features/project/components';
import { useCreateProject } from '@/features/project/hooks';
import { ProjectSchemaType } from '@/features/project/schemas';

import { IconCancel } from '@/shared/components/shared';
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui';

export function ProjectCreateModal({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false);

	const { isProjectCreateLoading, createProject } = useCreateProject();

	const handleSubmit = async (body: ProjectSchemaType) => {
		createProject(body);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Создание проекта</DialogTitle>

					<DialogDescription>
						Заполните поля для создания нового проекта.
					</DialogDescription>
				</DialogHeader>

				<div className={'space-y-2'}>
					<ProjectForm
						onSubmit={handleSubmit}
						isLoading={isProjectCreateLoading}
					/>

					<DialogClose asChild disabled={isProjectCreateLoading}>
						<Button
							loading={isProjectCreateLoading}
							size={'lg'}
							variant={'outline'}
							className={'w-full'}
						>
							<IconCancel />
							Закрыть
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
