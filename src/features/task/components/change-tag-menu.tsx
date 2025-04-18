import React, { cloneElement, isValidElement, PropsWithChildren } from 'react';

import { ITag } from '@/features/tag/types';
import { useUpdateTaskTag } from '@/features/task/hooks';

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
	tags: ITag[] | undefined;
	taskId: number;
	currentTagId?: number;
	children: React.ReactElement<LoadingChildProps>;
};

export function ChangeTagMenu({
	tags,
	taskId,
	currentTagId,
	children,
}: PropsWithChildren<Props>) {
	const { updateTag, isUpdateTagLoading } = useUpdateTaskTag();

	const triggerElement = isValidElement(children)
		? cloneElement(children, { loading: isUpdateTagLoading })
		: children;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>

			<DropdownMenuContent>
				{tags &&
					(tags.length === 0 ? (
						<DropdownMenuItem disabled>Теги не найдены</DropdownMenuItem>
					) : (
						<>
							{tags.map((tag) => (
								<DropdownMenuItem
									key={tag.id}
									disabled={tag.id === currentTagId}
									onClick={() => updateTag({ taskId, tagId: tag.id })}
								>
									{tag.id === currentTagId && (
										<IconCircle className={'fill-foreground size-2'} />
									)}

									{tag.name}
								</DropdownMenuItem>
							))}
							<DropdownMenuItem
								disabled={!currentTagId}
								onClick={() => updateTag({ taskId, tagId: null })}
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
