import { ProjectCard, ProjectCreateModal } from '@/features/project/components';
import { useGetProjects } from '@/features/project/hooks';

import {
	ErrorBlock,
	IconFolderAdd,
	Loading,
	PageTitles,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';

export function Projects() {
	const { isProjectsLoading, projects } = useGetProjects();

	if (isProjectsLoading) {
		return <Loading />;
	}

	if (!projects) {
		return <ErrorBlock />;
	}

	return (
		<div>
			<PageTitles
				title={'Проекты'}
				description={'Список всех проектов вашего отдела'}
				className={'px-4 py-2'}
			>
				<ProjectCreateModal>
					<Button size={'lg'}>
						<IconFolderAdd /> Создать проект
					</Button>
				</ProjectCreateModal>
			</PageTitles>

			<section className={'grid grid-cols-4 gap-4 p-4'}>
				{projects.map((project) => (
					<ProjectCard project={project} key={project.id} />
				))}
			</section>
		</div>
	);
}
