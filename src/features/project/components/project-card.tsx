import { IProject } from '@/features/project/types';

import {
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
				<CardTitle className={'first-letter:uppercase'}>
					{project.name}
				</CardTitle>

				<CardDescription className={'line-clamp-2 first-letter:uppercase'}>
					{project.description}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<p className={'text-sm'}>{project.department.departmentName}</p>
			</CardContent>
		</Card>
	);
}
