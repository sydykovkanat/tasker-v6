import { AnimatePresence, motion } from 'framer-motion';

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
				<AnimatePresence mode={'popLayout'}>
					{projects.length === 0 ? (
						<p
							className={
								'text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
							}
						>
							Нет проектов. Создайте проект, нажав на кнопку в правом верхнем
							углу.
						</p>
					) : (
						projects.map((project) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.1 }}
							>
								<ProjectCard project={project} />
							</motion.div>
						))
					)}
				</AnimatePresence>
			</section>
		</div>
	);
}
