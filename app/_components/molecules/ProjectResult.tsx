import { type Task } from '@/app/_types/Task';
import {
  getExpectedTime,
  getStandardDeviation,
  getVariance,
  getProjectExpectedTime,
  getProjectVariance,
  getProjectCompletionProbability,
} from '@/app/_utils/calculator';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export interface ProjectResultProps {
  tasks: Task[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="border border-background-hihglighted bg-white p-2">
        <p className="text-sm">{`Completion time: ${label}`}</p>
        <p className="text-sm">{`Probability: ${payload[0].value}%`}</p>
      </div>
    );
  }

  return null;
};

const ProjectResult = ({ tasks }: ProjectResultProps) => {
  const renderLineChart = () => {
    const data = [];
    const completionTime = 0;
    const expectedTime = getProjectExpectedTime(tasks);
    const variance = getProjectVariance(tasks);
    const standardDeviation = Math.sqrt(variance);
    const totalPessimisticEstimate = tasks.reduce((acc, task) => acc + task.pessimisticEstimate, 0);

    for (let i = 0; i <= totalPessimisticEstimate; i++) {
      data.push({
        completionTime: i,
        probability: getProjectCompletionProbability(tasks, i).toFixed(2),
      });
    }

    return (
      <>
        <figure className="flex w-full flex-col items-center justify-center">
          <LineChart width={800} height={400} data={data}>
            <Line type="monotone" dataKey="probability" stroke="var(--color-primary)" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
            <XAxis dataKey="completionTime" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
          <figcaption className="text-center text-sm">
            Probability of project completion calculated using the standard normal distribution function with a mean of{' '}
            <strong>{expectedTime.toFixed(2)}</strong> and a standard deviation of{' '}
            <strong>{standardDeviation.toFixed(2)}</strong>.
          </figcaption>
        </figure>
      </>
    );
  };

  return tasks.length > 0 ? (
    <>
      <div className="flex w-full flex-col flex-nowrap gap-3 border border-background-hihglighted bg-white p-3">
        <table className="w-full border-collapse">
          <thead className="border-b border-background-hihglighted font-semibold">
            <tr>
              <td scope="col">Task name</td>
              <td className="text-right" scope="col">
                Expected time
              </td>
              <td className="text-right" scope="col">
                Standard deviation
              </td>
              <td className="text-right" scope="col">
                Variance
              </td>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td className="text-right">
                  {getExpectedTime(task.pessimisticEstimate, task.optimisticEstimate, task.mostLikelyEstimate).toFixed(
                    2
                  )}
                </td>
                <td className="text-right">
                  {getStandardDeviation(task.pessimisticEstimate, task.optimisticEstimate).toFixed(2)}
                </td>
                <td className="text-right">
                  {getVariance(task.pessimisticEstimate, task.optimisticEstimate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-background-hihglighted">
              <td role="cell" className="text-right font-semibold">
                Total expected time:
              </td>
              <td className="text-right">{getProjectExpectedTime(tasks).toFixed(2)}</td>
              <td role="cell" className="text-right font-semibold">
                Total variance:
              </td>
              <td className="text-right">{getProjectVariance(tasks).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex w-full flex-col flex-nowrap gap-3 border border-background-hihglighted bg-white p-3">
        {renderLineChart()}
      </div>
    </>
  ) : (
    <div className="flex w-full flex-col flex-nowrap gap-3 border border-background-hihglighted bg-white p-3">
      <p className="text-center text-base">Results will be displayed here once you add tasks to the project.</p>
    </div>
  );
};

export default ProjectResult;
