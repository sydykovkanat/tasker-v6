import { AnimatePresence, motion } from 'framer-motion';

import { TagCard } from '@/features/tag/components';
import { TagCreateModal } from '@/features/tag/components/tag-create-modal';
import { useGetTags } from '@/features/tag/hooks';

import {
	ErrorBlock,
	IconFolderAdd,
	Loading,
	PageTitles,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';

export function Tags() {
	const { tags, isTagsLoading } = useGetTags();

	if (isTagsLoading) {
		return <Loading />;
	}

	if (!tags) {
		return <ErrorBlock />;
	}

	return (
		<div>
			<PageTitles
				title={'Теги'}
				description={'Список всех тегов вашего отдела'}
				className={'px-4 py-2'}
			>
				<TagCreateModal>
					<Button size={'lg'}>
						<IconFolderAdd /> Создать тег
					</Button>
				</TagCreateModal>
			</PageTitles>

			<section className={'grid grid-cols-4 gap-4 p-4'}>
				<AnimatePresence mode={'popLayout'}>
					{tags.length === 0 ? (
						<p
							className={
								'text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
							}
						>
							Нет тегов. Создайте тег, нажав на кнопку в правом верхнем углу.
						</p>
					) : (
						tags.map((tag) => (
							<motion.div
								key={tag.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.1 }}
							>
								<TagCard tag={tag} />
							</motion.div>
						))
					)}
				</AnimatePresence>
			</section>
		</div>
	);
}
