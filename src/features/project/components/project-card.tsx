import { ProjectEditModal } from '@/features/project/components';
import { useDeleteProject } from '@/features/project/hooks';
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
	const { isProjectDeleteLoading, deleteProject } = useDeleteProject();

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
						<Button
							loading={isProjectDeleteLoading}
							onClick={() => deleteProject(project.id)}
							size={'icon'}
						>
							<IconFolderRemove />
						</Button>

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
