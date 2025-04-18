import React, { cloneElement, isValidElement, PropsWithChildren } from 'react';

import { IProject } from '@/features/project/types';
import { useEditTaskProject } from '@/features/task/hooks';

import { IconCancel, IconCircle } from '@/shared/components/shared';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui';

interface LoadingChildProps {
	loading?: boolean;
}

type Props = {
	projects: IProject[] | undefined;
	taskId: number;
	currentProjectId?: number;
	children: React.ReactElement<LoadingChildProps>;
};

export function ChangeProjectMenu({
	projects,
	taskId,
	currentProjectId,
	children,
}: PropsWithChildren<Props>) {
	const { editProject, isEditTaskProjectLoading } = useEditTaskProject();

	const triggerElement = isValidElement(children)
		? cloneElement(children, { loading: isEditTaskProjectLoading })
		: children;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>

			<DropdownMenuContent>
				{projects &&
					(projects.length === 0 ? (
						<DropdownMenuItem disabled>Проектов нет</DropdownMenuItem>
					) : (
						<>
							{projects.map((project) => (
								<DropdownMenuItem
									key={project.id}
									disabled={project.id === currentProjectId}
									onClick={() => editProject({ taskId, projectId: project.id })}
								>
									{project.id === currentProjectId && (
										<IconCircle className={'fill-foreground size-2'} />
									)}

									{project.name}
								</DropdownMenuItem>
							))}
							<DropdownMenuItem
								disabled={!currentProjectId}
								onClick={() => editProject({ taskId, projectId: null })}
							>
								<IconCancel />
								Убрать тег
							</DropdownMenuItem>
						</>
					))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
