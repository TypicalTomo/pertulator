import { type Project } from '@/app/_types/Project';
import { type Task } from '@/app/_types/Task';
import SummaryItem from '../atoms/SummaryItem';
import {
  getLowestProjectPrice,
  getHighestProjectPrice,
  getExpectedProjectPrice,
  getProjectVariance,
  getProjectStandardDeviation,
  getExpectedTime,
} from '@/app/_utils/calculator';
import { useEffect, useState } from 'react';

export interface Props {
  project?: Project;
  tasks: Task[];
}

const ProjectSummary = ({ project, tasks }: Props) => {
  const [lowestPrice, setLowestPrice] = useState<number | undefined>();
  const [highestPrice, setHighestPrice] = useState<number | undefined>();
  const [expectedPrice, setExpectedPrice] = useState<number | undefined>();
  const [variance, setVariance] = useState<number | undefined>();
  const [standardDeviation, setStandardDeviation] = useState<number | undefined>();

  useEffect(() => {
    if (project && project.unitPrice) {
      setLowestPrice(getLowestProjectPrice(tasks, project.unitPrice));
      setHighestPrice(getHighestProjectPrice(tasks, project.unitPrice));
      setExpectedPrice(getExpectedProjectPrice(tasks, project.unitPrice));
    }
    setVariance(getProjectVariance(tasks));
    setStandardDeviation(getProjectStandardDeviation(tasks));
  }, [project, tasks]);

  const getStandardDeviationSummary = () => {
    return standardDeviation && standardDeviation > 2 ? (
      <SummaryItem
        message={`Standard deviation is high (<strong>${standardDeviation.toFixed(2)}</strong>). Consider splitting tasks with high variability into smaller tasks.`}
        variant="warning"
      />
    ) : null;
  };

  const getBudgetRangeSummary = () => {
    return project?.unitPrice && project.currency && lowestPrice && highestPrice ? (
      <SummaryItem
        message={`Budget range is between <strong>${lowestPrice.toFixed(2)} ${project.currency} - ${highestPrice.toFixed(2) + project.currency}</strong>.`}
        variant="info"
      />
    ) : null;
  };

  const getExpectedPriceSummary = () => {
    return expectedPrice ? (
      <SummaryItem
        message={`Mean project price is <strong>${expectedPrice.toFixed(2)} ${project?.currency}</strong>.`}
        variant="info"
      />
    ) : null;
  };

  const getVarianceSummary = () => {
    return variance ? (
      <SummaryItem message={`Variance is <strong>${variance.toFixed(2)}</strong>.`} variant="info" />
    ) : null;
  };

  const getProjectDurationSummary = () => {
    // warn if some tasks have expected time greater than 20 time units with message: 'Some tasks have expected time greater than 20 time units. Consider splitting them into smaller tasks. The longest task is 'task name' with 'expected time' time units.'

    if (project) {
      const longestTask = tasks.reduce(
        (acc, task) => {
          const expectedTime = getExpectedTime(
            task.pessimisticEstimate,
            task.optimisticEstimate,
            task.mostLikelyEstimate
          );
          return expectedTime > acc.expectedTime ? { name: task.name, expectedTime } : acc;
        },
        { name: '', expectedTime: 0 }
      );

      return longestTask.expectedTime > 20 ? (
        <SummaryItem
          message={`Some tasks have expected time greater than 20 time units. Consider splitting them into smaller tasks. The longest task is <strong>${longestTask.name}</strong> with <strong>${longestTask.expectedTime.toFixed(2)}</strong> time units.`}
          variant="warning"
        />
      ) : null;
    }
  };

  return project && tasks.length > 0 ? (
    <>
      <div className="flex w-full flex-col flex-nowrap gap-3 border border-background-hihglighted bg-white p-3">
        {getStandardDeviationSummary()}
        {getProjectDurationSummary()}
        {getBudgetRangeSummary()}
        {getExpectedPriceSummary()}
        {getVarianceSummary()}
      </div>
    </>
  ) : (
    <div className="flex w-full flex-col flex-nowrap gap-3 border border-background-hihglighted bg-white p-3">
      <p className="text-center text-base">Summary will be displayed here once you add tasks to the project.</p>
    </div>
  );
};

export default ProjectSummary;
