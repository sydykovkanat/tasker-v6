import { PropsWithChildren } from 'react';

import { useGetMyStatistics } from '@/features/statistics/hooks';

import { ErrorBlock, Loading, PageTitles } from '@/shared/components/shared';
import { CountUp } from '@/shared/components/ui';

export function Statistics() {
	const { isMyStatisticsLoading, myStatistics } = useGetMyStatistics();

	if (isMyStatisticsLoading) {
		return <Loading />;
	}

	if (!myStatistics) {
		return <ErrorBlock />;
	}

	return (
		<div>
			<PageTitles
				title={'Статистика'}
				description={'Ваша статистика по всем задачам и проектам.'}
				className={'px-4 py-2'}
			/>

			<div
				className={'grid grid-cols-3 gap-8 p-8'}
				style={{
					height: 'calc(100vh - 73px)',
				}}
			>
				<StatisticBlock>
					<div className={'text-5xl'}>
						{<CountUp to={myStatistics.completedTasks} />}
					</div>
					<div className={'text-muted-foreground text-xl'}>Завершено задач</div>
				</StatisticBlock>

				<StatisticBlock>
					<div className={'text-5xl'}>
						{<CountUp to={myStatistics.allTasks} />}
					</div>
					<div className={'text-muted-foreground text-xl'}>Всего задач</div>
				</StatisticBlock>

				<StatisticBlock>
					<div className={'text-5xl'}>
						{
							<div>
								<CountUp to={myStatistics.percentCompletedTasks} />%
							</div>
						}
					</div>
					<div className={'text-muted-foreground text-xl'}>
						Процент завершенных задач
					</div>
				</StatisticBlock>
			</div>
		</div>
	);
}

function StatisticBlock({ children }: PropsWithChildren) {
	return (
		<div
			className={
				'bg-primary text-background flex flex-1 flex-col items-center justify-center rounded-3xl border text-center shadow-lg'
			}
		>
			{children}
		</div>
	);
}
