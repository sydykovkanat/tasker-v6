import { TagDeleteModal } from '@/features/tag/components';
import { ITag } from '@/features/tag/types';

import { IconDelete } from '@/shared/components/shared';
import {
	Button,
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui';

interface Props {
	tag: ITag;
}

export function TagCard({ tag }: Props) {
	return (
		<Card className={'flex h-40 flex-col justify-between border'}>
			<CardHeader>
				<div className={'flex items-start justify-between gap-x-4'}>
					<div>
						<CardTitle>{tag.name}</CardTitle>
						<CardDescription>
							{tag.description || 'Нет описания'}
						</CardDescription>
					</div>

					<div>
						<TagDeleteModal tagId={tag.id} tagName={tag.name}>
							<Button size={'icon'}>
								<IconDelete />
							</Button>
						</TagDeleteModal>
					</div>
				</div>
			</CardHeader>

			<CardFooter>
				<p className={'text-sm'}>{tag.department.departmentName}</p>
			</CardFooter>
		</Card>
	);
}
