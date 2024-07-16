import { type Task } from '@/app/_types/Task';
import TaskItem from '../atoms/TaskItem';

export interface Props {
  tasks: Task[];
  onTaskRemove?: (index: number) => void;
}

const TaskList = ({ tasks, onTaskRemove }: Props) => {
  const handleTaskRemove = (index: number) => {
    if (typeof index === 'number') {
      onTaskRemove && onTaskRemove(index);
    }
  };

  return tasks.length > 0 ? (
    <ul className="flex w-full flex-col gap-6">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} onRemove={handleTaskRemove} />
      ))}
    </ul>
  ) : (
    <div className="flex w-full flex-col flex-nowrap gap-3 border border-background-hihglighted bg-white p-3">
      <p className="text-center text-base">No tasks added yet. Add a task using the form below.</p>
    </div>
  );
};

export default TaskList;
