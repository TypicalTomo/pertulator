'use client';
import { type Task } from '@/app/_types/Task';
import { type Project } from '@/app/_types/Project';
import { use, useState } from 'react';
import SectionWrapper from '../molecules/SectionWrapper';
import TaskForm from '../molecules/TaskForm';
import TaskList from '../molecules/TaskList';
import SectionHeading from '../molecules/SectionHeading';
import ProjectResult from '../molecules/ProjectResult';
import Button from '../atoms/Button';
import PageHeading from '../molecules/PageHeading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadProject, saveProject, clearProject } from '@/app/_utils/project';
import { useEffect } from 'react';

const EstimateManager = () => {
  const [project, setProject] = useState<Project | undefined>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadedProject = loadProject();

    if (loadedProject) {
      setProject(loadedProject);
      setTasks(loadedProject.tasks);
    } else {
      router.push('/project/edit');
    }
  }, [router]);

  // save project when tasks change
  useEffect(() => {
    if (project) {
      saveProject({ ...project, tasks });
    }
  }, [project, tasks]);

  const handleTaskRemove = (index: number) => {
    if (typeof index === 'number') {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const handleNewProject = () => {
    // show confirmation dialog
    if (
      confirm(
        'Are you sure you want to start a new project? This will delete the current project. You can export the current project to JSON if you want to save it.'
      )
    ) {
      clearProject();
      router.push('/project/edit');
    }
  };

  return (
    <section className="py-12 md:py-24">
      <SectionWrapper>
        <PageHeading title={project ? project.name : '...'} />
        {project && project.description && (
          <dl className="w-full">
            <dt className="text-base font-semibold">Description:</dt>
            <dd className="text-base italic">{project.description}</dd>
          </dl>
        )}
        {project && project.manager && (
          <dl className="w-full">
            <dt className="text-base font-semibold">Project manager:</dt>
            <dd className="text-base italic">{project.manager}</dd>
          </dl>
        )}
        <div className="flex w-full flex-row gap-4">
          <Link href="/project/edit" className="text-primary-darker hover:underline">
            Edit project
          </Link>
          <button
            className="text-tertiary hover:underline"
            onClick={handleNewProject}
          >
            Start new project
          </button>
        </div>
        <TaskForm onSubmit={(task) => setTasks([...tasks, task])} />
        <SectionHeading title="Tasks" />
        <TaskList tasks={tasks} onTaskRemove={handleTaskRemove} />
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
              console.log('Prepare project for JSON export');
            }}
            disabled={tasks.length <= 0}
          />
          <Button
            variant="inverted"
            text="Export to CSV"
            class="w-full sm:w-auto"
            onClick={() => {
              console.log('Prepare project for CSV export');
            }}
            disabled={tasks.length <= 0}
          />
        </div>
      </SectionWrapper>
    </section>
  );
};

export default EstimateManager;
