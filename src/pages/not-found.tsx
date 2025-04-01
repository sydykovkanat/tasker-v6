import { Link } from 'react-router-dom';

import { IconArrowLeft } from '@/shared/components/shared';
import { buttonVariants } from '@/shared/components/ui';

export function NotFound() {
	return (
		<main
			className={'flex min-h-[calc(100vh-4rem)] items-center justify-center'}
		>
			<div className={'text-center'}>
				<h1 className={'text-2xl'}>
					404 <span className={'text-muted-foreground'}>•</span> Страница не
					найдена
				</h1>

				<p className={'text-muted-foreground max-w-sm'}>
					Вероятно, вы перешли по неверной ссылке или страница была удалена.
				</p>

				<Link
					to={'/'}
					className={buttonVariants({
						variant: 'outline',
						className: 'mt-2',
					})}
				>
					<IconArrowLeft />
					На главную
				</Link>
			</div>
		</main>
	);
}
