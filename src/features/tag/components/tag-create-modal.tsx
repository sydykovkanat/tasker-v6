import { PropsWithChildren, useState } from 'react';

import { TagForm } from '@/features/tag/components';
import { useCreateTag } from '@/features/tag/hooks';
import { TagSchemaType } from '@/features/tag/schemas';

import { IconCancel } from '@/shared/components/shared';
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui';

export function TagCreateModal({ children }: PropsWithChildren) {
	const [isOpen, setIsOpen] = useState(false);

	const { createTag, isTagCreateLoading } = useCreateTag();

	const handleSubmit = async (body: TagSchemaType) => {
		createTag(body);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Создание тега</DialogTitle>

					<DialogDescription>
						Заполните поля для создания нового тега.
					</DialogDescription>
				</DialogHeader>

				<div className={'space-y-2'}>
					<TagForm onSubmit={handleSubmit} isLoading={isTagCreateLoading} />

					<DialogClose asChild disabled={isTagCreateLoading}>
						<Button
							loading={isTagCreateLoading}
							size={'lg'}
							variant={'outline'}
							className={'w-full'}
						>
							<IconCancel />
							Закрыть
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
