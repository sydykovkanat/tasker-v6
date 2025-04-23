import { ChangeEvent, PropsWithChildren, useRef } from 'react';

import { useEditSubordinateAvatar } from '@/features/subordinate/hooks';

import { IconEdit } from '@/shared/components/shared';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui';

interface Props {
	subordinateId: number;
}

export function SubordinateItemMenu({
	subordinateId,
	children,
}: PropsWithChildren<Props>) {
	const { editAvatar, isEditAvatarLoading } = useEditSubordinateAvatar();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleEditAvatar = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			editAvatar({ subordinateId, avatar: file });
		}
	};

	return (
		<>
			<input
				className={'invisible'}
				type={'file'}
				ref={inputRef}
				onChange={handleEditAvatar}
			/>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

				<DropdownMenuContent side={'left'}>
					<DropdownMenuItem
						disabled={isEditAvatarLoading}
						onClick={() => {
							inputRef.current?.click();
						}}
					>
						<IconEdit />
						Сменить аватар
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
