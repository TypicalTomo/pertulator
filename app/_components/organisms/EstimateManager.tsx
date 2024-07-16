'use client';
import { type Task } from '@/app/_types/Task';
import { useState } from 'react';
import SectionWrapper from '../molecules/SectionWrapper';
import TaskForm from '../molecules/TaskForm';
import TaskList from '../molecules/TaskList';
import SectionHeading from '../molecules/SectionHeading';
import ProjectResult from '../molecules/ProjectResult';
import Button from '../atoms/Button';

const EstimateManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskRemove = (index: number) => {
    if (typeof index === 'number') {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  return (
    <section className="py-12 md:py-24">
      <SectionWrapper>
        <SectionHeading title="Project name" />
        <TaskList tasks={tasks} onTaskRemove={handleTaskRemove} />
        <hr className="h-px w-full border-none bg-background-hihglighted" />
        <TaskForm onSubmit={(task) => setTasks([...tasks, task])} />
        <SectionHeading title="Results" />
        <ProjectResult tasks={tasks} />
        <hr className="h-px w-full border-none bg-background-hihglighted" />
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <Button
            variant="primary"
            text="Print mode"
            class="w-full sm:w-auto"
            onClick={() => {
              console.log('Prepare project for printing');
            }}
            disabled={tasks.length <= 0}
          />
          <Button
            variant="inverted"
            text="Export to JSON"
            class="w-full sm:w-auto"
            onClick={() => {
              console.log('Prepare project for printing');
            }}
            disabled={tasks.length <= 0}
          />
          <Button
            variant="inverted"
            text="Export to CSV"
            class="w-full sm:w-auto"
            onClick={() => {
              console.log('Prepare project for printing');
            }}
            disabled={tasks.length <= 0}
          />
        </div>
      </SectionWrapper>
    </section>
  );
};

export default EstimateManager;
