import { IPerson } from '@/features/auth/types';

import { Avatar } from '@/shared/components/ui';
import { cn } from '@/shared/utils';

interface Props {
	author: IPerson;
	performer: IPerson;
	className?: string;
}

export function TaskAssignedCard({ author, performer, className }: Props) {
	const isOnePerson = author.id === performer.id;

	return (
		<div
			className={cn(
				'bg-secondary flex items-center justify-between gap-x-4 rounded-full border border-dashed p-2',
				{
					'max-w-max pr-4': isOnePerson,
				},
				className,
			)}
		>
			{!isOnePerson && (
				<div className={'flex items-center gap-x-2'}>
					<Avatar
						src={author.avatar}
						className={'size-16'}
						fallback={author.name}
					/>

					<div className={'leading-none'}>
						<h4 className={'text-muted-foreground text-sm'}>Автор</h4>
						<p className={'text-wrap'}>{author.name}</p>
					</div>
				</div>
			)}

			<div
				className={cn('flex items-center gap-x-2', {
					'flex-row-reverse': isOnePerson,
				})}
			>
				<div className={'leading-none'}>
					<h4
						className={cn('text-muted-foreground text-sm', {
							'text-end': !isOnePerson,
						})}
					>
						Исполнитель
					</h4>
					<p
						className={cn('text-wrap', {
							'text-end': !isOnePerson,
						})}
					>
						{performer.name}
					</p>
				</div>

				<Avatar
					src={performer.avatar}
					fallback={performer.name}
					className={'size-16'}
				/>
			</div>
		</div>
	);
}
