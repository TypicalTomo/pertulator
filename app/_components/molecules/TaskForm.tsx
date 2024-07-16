'use client';
import { type Task } from '@/app/_types/Task';
import Button from '../atoms/Button';
import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';

export interface Props {
  onSubmit?: (taskData: Task) => void;
}

const TaskForm = ({ onSubmit }: Props) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [pessimisticEstimate, setPessimisticEstimate] = useState<number>(0);
  const [optimisticEstimate, setOptimisticEstimate] = useState<number>(0);
  const [mostLikelyEstimate, setMostLikelyEstimate] = useState<number>(0);
  const [error, setError] = useState<any>({});
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const pessimisticEstimateRef = useRef<HTMLInputElement>(null);
  const optimisticEstimateRef = useRef<HTMLInputElement>(null);
  const mostLikelyEstimateRef = useRef<HTMLInputElement>(null);

  const validateEstimates = useCallback(() => {
    let errors: any = {};

    if (pessimisticEstimate <= mostLikelyEstimate) {
      errors['pessimisticEstimate'] = 'Pessimistic estimate must be higher than most likely estimate.';
    }

    if (pessimisticEstimate <= optimisticEstimate) {
      errors['pessimisticEstimate'] = 'Pessimistic estimate must be higher than optimistic estimate.';
    }

    if (optimisticEstimate >= mostLikelyEstimate) {
      errors['optimisticEstimate'] = 'Optimistic estimate must be lower than most likely estimate.';
    }

    if (optimisticEstimate >= pessimisticEstimate) {
      errors['optimisticEstimate'] = 'Optimistic estimate must be lower than pessimistic estimate.';
    }

    if (mostLikelyEstimate <= optimisticEstimate) {
      errors['mostLikelyEstimate'] = 'Most likely estimate must be higher than optimistic estimate.';
    }

    if (mostLikelyEstimate >= pessimisticEstimate) {
      errors['mostLikelyEstimate'] = 'Most likely estimate must be lower than pessimistic estimate.';
    }

    setError(errors);

    if (errors.pessimisticEstimate || errors.optimisticEstimate || errors.mostLikelyEstimate) {
      return false;
    } else {
      return true;
    }
  }, [pessimisticEstimate, optimisticEstimate, mostLikelyEstimate]);

  const clearForm = () => {
    setTaskName('');
    setTaskDescription('');
    setPessimisticEstimate(0);
    setOptimisticEstimate(0);
    setMostLikelyEstimate(0);
    setError({});
    setSubmitAttempt(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempt(true);

    if (!validateEstimates()) {
      return;
    }

    const taskData: Task = {
      name: taskName,
      description: taskDescription,
      pessimisticEstimate: pessimisticEstimate,
      optimisticEstimate: optimisticEstimate,
      mostLikelyEstimate: mostLikelyEstimate,
    };

    onSubmit && onSubmit(taskData);
    clearForm();
  };

  useEffect(() => {
    if (submitAttempt) {
      validateEstimates();
    }
  }, [pessimisticEstimate, optimisticEstimate, mostLikelyEstimate, submitAttempt, validateEstimates]);

  return (
    <form
      className="flex w-full flex-col flex-nowrap gap-3 border border-background-hihglighted bg-white p-3"
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-2">
        <label className="sr-only text-sm font-medium" htmlFor="task_name">
          Task name
        </label>
        <input
          type="text"
          id="task_name"
          name="task_name"
          placeholder="Enter task name"
          required
          autoComplete="off"
          className="border-b border-background-hihglighted bg-transparent px-0 py-2 font-heading text-base font-semibold transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0 md:text-lg"
          onChange={(e) => setTaskName(e.target.value || '')}
          value={taskName}
        />
      </div>
      <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-2">
        <label className="sr-only text-sm font-medium" htmlFor="task_description">
          Task description (optional)
        </label>
        <textarea
          id="task_description"
          name="task_description"
          placeholder="Enter task description (optional)"
          rows={3}
          autoComplete="off"
          className="resize-none border-b border-background-hihglighted bg-transparent px-0 py-2 text-base transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0"
          onChange={(e) => setTaskDescription(e.target.value || '')}
          value={taskDescription}
        />
      </div>
      <div className="flex w-full flex-row flex-nowrap items-stretch justify-stretch gap-2">
        <div className="flex w-full flex-col flex-nowrap items-stretch justify-stretch gap-2">
          <label className="text-sm font-medium" htmlFor="task_estimate_optimistic">
            Optimistic estimate
          </label>
          <input
            type="number"
            id="task_estimate_optimistic"
            name="task_estimate_optimistic"
            placeholder="Optimistic estimate"
            step={1}
            min={0}
            max={100}
            autoComplete="off"
            className="border-b border-background-hihglighted bg-transparent px-0 py-2 text-base transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0"
            onChange={(e) => {
              setOptimisticEstimate(parseInt(e.target.value || '0'));
            }}
            value={optimisticEstimate}
            ref={optimisticEstimateRef}
          />
        </div>
        <div className="flex w-full flex-col flex-nowrap items-stretch justify-stretch gap-2">
          <label className="text-sm font-medium" htmlFor="task_estimate_most_likely">
            Most likely estimate
          </label>
          <input
            type="number"
            id="task_estimate_most_likely"
            name="task_estimate_most_likely"
            placeholder="Most likely estimate"
            step={1}
            min={0}
            max={100}
            autoComplete="off"
            className="border-b border-background-hihglighted bg-transparent px-0 py-2 text-base transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0"
            onChange={(e) => setMostLikelyEstimate(parseInt(e.target.value || '0'))}
            value={mostLikelyEstimate}
            ref={mostLikelyEstimateRef}
          />
        </div>
        <div className="flex w-full flex-col flex-nowrap items-stretch justify-stretch gap-2">
          <label className="text-sm font-medium" htmlFor="task_estimate_pessimistic">
            Pessimistic estimate
          </label>
          <input
            type="number"
            id="task_estimate_pessimistic"
            name="task_estimate_pessimistic"
            placeholder="Pessimistic estimate"
            step={1}
            min={0}
            max={100}
            autoComplete="off"
            className="border-b border-background-hihglighted bg-transparent px-0 py-2 text-base transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0"
            onChange={(e) => setPessimisticEstimate(parseInt(e.target.value || '0'))}
            value={pessimisticEstimate}
            ref={pessimisticEstimateRef}
          />
        </div>
      </div>
      {Object.keys(error).length > 0 && (
        <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-1 border border-red-500 bg-red-50 p-2 text-sm text-red-500">
          {error.pessimisticEstimate && <p>{error.pessimisticEstimate}</p>}
          {error.optimisticEstimate && <p>{error.optimisticEstimate}</p>}
        </div>
      )}
      <div className="flex w-full items-stretch justify-stretch">
        <Button
          type="submit"
          text="Create task"
          variant="primary"
          class="w-full sm:w-auto"
          size="small"
          disabled={Object.keys(error).length > 0}
        />
      </div>
    </form>
  );
};

export default TaskForm;
