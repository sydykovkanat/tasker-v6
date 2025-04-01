import { IconArrowLeft } from '@/shared/components/shared/icons.tsx';
import { Button } from '@/shared/components/ui';

export function ErrorBlock() {
	return (
		<div
			className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}
		>
			<div className={'text-center'}>
				<h1 className={'text-2xl'}>Произошла ошибка</h1>

				<p className={'text-muted-foreground max-w-sm'}>
					Вероятно, запрос не удался из-за проблем с сетью или сервером
				</p>

				<Button
					onClick={() => window.location.reload()}
					variant={'outline'}
					className={'mt-2'}
				>
					<IconArrowLeft />
					Обновить страницу
				</Button>
			</div>
		</div>
	);
}
