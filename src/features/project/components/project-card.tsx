import {
	ProjectDeleteModal,
	ProjectEditModal,
} from '@/features/project/components';
import { IProject } from '@/features/project/types';

import { IconFolderEdit, IconFolderRemove } from '@/shared/components/shared';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui';

interface Props {
	project: IProject;
}

export function ProjectCard({ project }: Props) {
	return (
		<Card className={'flex h-40 flex-col justify-between'}>
			<CardHeader>
				<div className={'flex items-start justify-between gap-x-4'}>
					<div>
						<CardTitle className={'line-clamp-2 first-letter:uppercase'}>
							{project.name}
						</CardTitle>

						<CardDescription className={'line-clamp-4 first-letter:uppercase'}>
							{project.description}
						</CardDescription>
					</div>

					<div className={'flex items-center gap-x-1'}>
						<ProjectDeleteModal projectId={project.id}>
							<Button size={'icon'}>
								<IconFolderRemove />
							</Button>
						</ProjectDeleteModal>

						<ProjectEditModal
							projectId={project.id}
							defaultValues={{
								name: project.name,
								description: project.description,
							}}
						>
							<Button size={'icon'}>
								<IconFolderEdit />
							</Button>
						</ProjectEditModal>
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<p className={'text-sm'}>{project.department.departmentName}</p>
			</CardContent>
		</Card>
	);
}
