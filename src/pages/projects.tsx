import { ProjectCard } from '@/features/project/components/project-card.tsx';
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
				<Button size={'lg'}>
					<IconFolderAdd /> Создать проект
				</Button>
			</PageTitles>

			<section className={'grid grid-cols-4 gap-4 p-4'}>
				{projects.map((project) => (
					<ProjectCard project={project} key={project.id} />
				))}
			</section>
		</div>
	);
}
