import { type Task } from '../_types/Task';
import { erf } from 'mathjs';

export const getExpectedTime = (
  pessimisticEstimate: number,
  optimisticEstimate: number,
  mostLikelyEstimate: number
) => {
  return (pessimisticEstimate + 4 * mostLikelyEstimate + optimisticEstimate) / 6;
};

export const getStandardDeviation = (pessimisticEstimate: number, optimisticEstimate: number) => {
  return (pessimisticEstimate - optimisticEstimate) / 6;
};

export const getVariance = (pessimisticEstimate: number, optimisticEstimate: number) => {
  return Math.pow(getStandardDeviation(pessimisticEstimate, optimisticEstimate), 2);
};

export const getProjectExpectedTime = (tasks: Task[]) => {
  return tasks.reduce(
    (acc, task) => acc + getExpectedTime(task.pessimisticEstimate, task.optimisticEstimate, task.mostLikelyEstimate),
    0
  );
};

export const getProjectVariance = (tasks: Task[]) => {
  return tasks.reduce((acc, task) => acc + getVariance(task.pessimisticEstimate, task.optimisticEstimate), 0);
};

export const getProjectCompletionProbability = (tasks: Task[], completionTime: number) => {
  // calculate probability of project at given completion time, tasks are not related, so we can just multiply probabilities
  return tasks.reduce((acc, task) => acc * getCompletionProbability(task, completionTime), 1) * 100;
}

const getCompletionProbability = (task: Task, completionTime: number) => {
  const expectedTime = getExpectedTime(task.pessimisticEstimate, task.optimisticEstimate, task.mostLikelyEstimate);
  const standardDeviation = getStandardDeviation(task.pessimisticEstimate, task.optimisticEstimate);
  const z = (completionTime - expectedTime) / standardDeviation;

  return standardNormalDistribution(z);
}

const standardNormalDistribution = (z: number) => {
  return (1 + erf(z / Math.sqrt(2))) / 2;
}