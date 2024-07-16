import { type Task } from '@/app/_types/Task';
import { getExpectedTime, getStandardDeviation, getVariance } from '@/app/_utils/calculator';
import Button from './Button';

export interface Props {
  task: Task;
  index: number;
  onRemove?: (index: number) => void;
}

const TaskItem = ({ task, index, onRemove }: Props) => {
  const expectedTime = getExpectedTime(task.pessimisticEstimate, task.optimisticEstimate, task.mostLikelyEstimate);
  const variance = getVariance(task.pessimisticEstimate, task.optimisticEstimate);
  const standardDeviation = getStandardDeviation(task.pessimisticEstimate, task.optimisticEstimate);
  const totalTime = task.pessimisticEstimate + task.optimisticEstimate + task.mostLikelyEstimate;

  const handleRemove = () => {
    if (typeof index === 'number') {
      onRemove && onRemove(index);
    }
  };

  return (
    <li className="flex w-full flex-col flex-nowrap gap-3 border border-background-hihglighted bg-white">
      <div className="flex w-full flex-col flex-nowrap gap-3 p-3">
        <div className='flex w-full flex-row flex-nowrap items-stretch justify-between gap-3'>
          <h3 className="px-0 font-heading text-base font-semibold transition duration-300 ease-in-out md:text-lg">
            {task.name}
          </h3>
          <Button
            text="Remove"
            variant="tertiary"
            size="small"
            icon="ph:x"
            iconOnly={true}
            onClick={handleRemove}
            class='p-1'
          />
        </div>
        {task.description && <p className="px-0 text-base transition duration-300 ease-in-out">{task.description}</p>}
        <div className="flex w-full flex-col flex-nowrap items-stretch justify-stretch gap-4">
          <div className="flex w-full flex-row flex-nowrap items-stretch justify-stretch gap-3">
            <dl className="flex w-full flex-col flex-nowrap items-stretch justify-stretch gap-1">
              <dd className="text-sm font-medium">Expected time</dd>
              <dt className="bg-transparent px-0 text-base transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0">
                {expectedTime.toFixed(2)}{' '}
                <span className={expectedTime - task.mostLikelyEstimate > 0 ? 'text-tertiary' : 'text-primary'}>
                  ({expectedTime - task.mostLikelyEstimate > 0 ? '+' : ''}
                  {(expectedTime - task.mostLikelyEstimate).toFixed(2)})
                </span>
              </dt>
            </dl>
            <dl className="flex w-full flex-col flex-nowrap items-stretch justify-stretch gap-1">
              <dd className="text-sm font-medium">Standard deviation</dd>
              <dt className="bg-transparent px-0 text-base transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0">
                {standardDeviation.toFixed(2)}
              </dt>
            </dl>
            <dl className="flex w-full flex-col flex-nowrap items-stretch justify-stretch gap-1">
              <dd className="text-sm font-medium">Variance</dd>
              <dt className="bg-transparent px-0 text-base transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0">
                {variance.toFixed(2)}
              </dt>
            </dl>
          </div>
          <div className="flex w-full flex-row flex-nowrap items-stretch justify-stretch gap-3">
            <dl className="flex w-full flex-col flex-nowrap items-stretch justify-stretch gap-1">
              <dd className="text-sm font-medium">Optimistic estimate</dd>
              <dt className="bg-transparent px-0 text-base transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0">
                {task.optimisticEstimate}
              </dt>
            </dl>
            <dl className="flex w-full flex-col flex-nowrap items-stretch justify-stretch gap-1">
              <dd className="text-sm font-medium">Most likely estimate</dd>
              <dt className="bg-transparent px-0 text-base transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0">
                {task.mostLikelyEstimate}
              </dt>
            </dl>
            <dl className="flex w-full flex-col flex-nowrap items-stretch justify-stretch gap-1">
              <dd className="text-sm font-medium">Pessimistic estimate</dd>
              <dt className="bg-transparent px-0 text-base transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0">
                {task.pessimisticEstimate}
              </dt>
            </dl>
          </div>
        </div>
      </div>
      <div className="flex h-1 w-full flex-row flex-nowrap items-stretch justify-stretch gap-0 overflow-hidden">
        <span
          className="bg-secondary flex flex-col flex-nowrap items-stretch justify-stretch gap-0"
          style={{ width: `${(task.optimisticEstimate / totalTime) * 100.0}%` }}
        ></span>
        <span
          className="flex flex-col flex-nowrap items-stretch justify-stretch gap-0 bg-primary"
          style={{ width: `${(task.mostLikelyEstimate / totalTime) * 100}%` }}
        ></span>
        <span
          className="bg-tertiary flex flex-col flex-nowrap items-stretch justify-stretch gap-0"
          style={{ width: `${(task.pessimisticEstimate / totalTime) * 100.0}%` }}
        ></span>
      </div>
    </li>
  );
};

export default TaskItem;
