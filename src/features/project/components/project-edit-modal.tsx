import { PropsWithChildren, useState } from 'react';

import { ProjectForm } from '@/features/project/components';
import { useEditProject } from '@/features/project/hooks';
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

interface Props {
	projectId: number;
	defaultValues: ProjectSchemaType;
}

export function ProjectEditModal({
	projectId,
	defaultValues,
	children,
}: PropsWithChildren<Props>) {
	const [isOpen, setIsOpen] = useState(false);

	const { updateProject, isProjectUpdateLoading } = useEditProject(projectId);

	const handleSubmit = async (body: ProjectSchemaType) => {
		updateProject(body);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Редактирование проекта</DialogTitle>

					<DialogDescription>
						Заполните поля для редактирования проекта.
					</DialogDescription>
				</DialogHeader>

				<div className={'space-y-2'}>
					<ProjectForm
						onSubmit={handleSubmit}
						isLoading={isProjectUpdateLoading}
						defaultValues={defaultValues}
					/>

					<DialogClose asChild disabled={isProjectUpdateLoading}>
						<Button
							loading={isProjectUpdateLoading}
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
