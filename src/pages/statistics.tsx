import { useGetMyStatistics } from '@/features/statistics/hooks';

import { ErrorBlock, Loading, PageTitles } from '@/shared/components/shared';
import { CountUp, ShinyText, WobbleCard } from '@/shared/components/ui';
import { cn } from '@/shared/utils';

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
				className={'grid grid-cols-3 items-center gap-8 p-8'}
				style={{
					height: 'calc(100vh - 73px)',
				}}
			>
				<StatisticBlock
					containerClassName={'h-[90%]'}
					text={'Завершено задач'}
					value={myStatistics.completedTasks}
				/>

				<StatisticBlock
					containerClassName={'h-full'}
					text={'Процент завершенных задач'}
					value={myStatistics.percentCompletedTasks}
					valueSuffix={'%'}
				/>

				<StatisticBlock
					containerClassName={'h-[84%]'}
					text={'Всего задач'}
					value={myStatistics.allTasks}
				/>
			</div>
		</div>
	);
}

interface StatisticsBlockProps {
	value: number;
	valueSuffix?: string;
	text: string;
	className?: string;
	containerClassName?: string;
}

function StatisticBlock({
	value,
	text,
	valueSuffix,
	containerClassName,
	className,
}: StatisticsBlockProps) {
	return (
		<WobbleCard
			containerClassName={cn(
				'rounded-[4rem] bg-primary border shadow-xl',
				containerClassName,
			)}
			className={cn(
				'bg-primary text-background flex flex-1 flex-col items-center justify-center rounded-[4rem] text-center',
				className,
			)}
		>
			<p className={'text-5xl'}>
				<CountUp to={value} />
				{valueSuffix}
			</p>
			<ShinyText text={text} />
		</WobbleCard>
	);
}
