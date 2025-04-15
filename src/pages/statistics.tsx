import { useGetMyStatistics } from '@/features/statistics/hooks';

import { ErrorBlock, Loading, PageTitles } from '@/shared/components/shared';
import { CountUp, ShinyText, WobbleCard } from '@/shared/components/ui';

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
				<StatisticBlock
					text={'Завершено задач'}
					value={myStatistics.completedTasks}
				/>

				<StatisticBlock text={'Всего задач'} value={myStatistics.allTasks} />

				<StatisticBlock
					text={'Процент завершенных задач'}
					value={myStatistics.percentCompletedTasks}
					valueSuffix={'%'}
				/>
			</div>
		</div>
	);
}

interface StatisticsBlockProps {
	value: number;
	valueSuffix?: string;
	text: string;
}

function StatisticBlock({ value, text, valueSuffix }: StatisticsBlockProps) {
	return (
		<WobbleCard
			containerClassName={'rounded-4xl bg-primary border shadow-xl'}
			className={
				'bg-primary text-background flex flex-1 flex-col items-center justify-center rounded-4xl text-center'
			}
		>
			<p className={'text-5xl'}>
				<CountUp to={value} />
				{valueSuffix}
			</p>
			<ShinyText text={text} />
		</WobbleCard>
	);
}
