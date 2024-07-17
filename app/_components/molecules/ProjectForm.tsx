'use client';
import { type Project } from '@/app/_types/Project';
import { type Task } from '@/app/_types/Task';
import Button from '../atoms/Button';
import { useEffect, useState } from 'react';

export interface Props {
  project?: Project;
  onSubmit?: (projectData: Project) => void;
}

const ProjectForm = ({ project, onSubmit }: Props) => {
  const [projectName, setProjectName] = useState<string>(project?.name || '');
  const [projectDescription, setProjectDescription] = useState<string>(project?.description || '');
  const [projectManager, setProjectManager] = useState<string>(project?.manager || '');
  const [tasks, setTasks] = useState<Task[]>(project?.tasks || []);
  const [unitPrice, setUnitPrice] = useState<number>(project?.unitPrice || 0);
  const [currency, setCurrency] = useState<string>(project?.currency || 'USD');

  useEffect(() => {
    if (project) {
      setProjectName(project.name);
      setProjectDescription(project.description || '');
      setProjectManager(project.manager);
      setTasks(project.tasks);
      setUnitPrice(project.unitPrice || 0.0);
      setCurrency(project.currency || 'USD');
    }
  }, [project]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const projectData: Project = {
      name: projectName,
      description: projectDescription,
      manager: projectManager,
      tasks: tasks,
      unitPrice: unitPrice,
      currency: currency,
    };

    onSubmit && onSubmit(projectData);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
      <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-1">
        <label className="text-sm font-medium" htmlFor="project_name">
          Project name
        </label>
        <input
          type="text"
          id="project_name"
          name="project_name"
          placeholder="Enter project name"
          required
          value={projectName}
          className="border-b border-background-hihglighted bg-transparent px-0 py-2 font-heading text-lg font-semibold transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0 md:text-xl"
          onChange={(e) => setProjectName(e.target.value || '')}
        />
      </div>
      <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-1">
        <label className="text-sm font-medium" htmlFor="project_description">
          Project description (optional)
        </label>
        <textarea
          id="project_description"
          name="project_description"
          placeholder="Enter project description"
          aria-describedby="project_description_help"
          rows={5}
          value={projectDescription}
          className="border-b border-background-hihglighted bg-transparent px-0 py-2 text-lg transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0"
          onChange={(e) => setProjectDescription(e.target.value || '')}
        />
        <small id="project_description_help" className="text-sm italic text-foreground-hihglighted">
          A brief description of the project. This will be added on the PDF report. Leave empty if not applicable.
        </small>
      </div>
      <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-1">
        <label className="text-sm font-medium" htmlFor="project_manager">
          Project manager (optional)
        </label>
        <input
          type="text"
          id="project_manager"
          placeholder="Enter project manager's name"
          name="project_manager"
          aria-describedby="project_manager_help"
          value={projectManager}
          className="border-b border-background-hihglighted bg-transparent px-0 py-2 text-lg transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0"
          onChange={(e) => setProjectManager(e.target.value || '')}
        />
        <small id="project_manager_help" className="text-sm italic text-foreground-hihglighted">
          This person will be added on the PDF report as the project manager. Leave empty if not applicable.
        </small>
      </div>
      <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-1">
        <label className="text-sm font-medium" htmlFor="unit_price">
          Unit price (optional)
        </label>
        <input
          type="number"
          id="project_unit_price"
          name="project_unit_price"
          aria-describedby="project_unit_price_help"
          placeholder="Enter unit price"
          value={unitPrice}
          step="0.01"
          min="0"
          className="border-b border-background-hihglighted bg-transparent px-0 py-2 text-lg transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0"
          onChange={(e) => setUnitPrice(Number(e.target.value) || 0)}
        />
        <small id="project_unit_price_help" className="text-sm italic text-foreground-hihglighted">
          The unit price of the project. Leave empty if not applicable.
        </small>
      </div>
      <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-1">
        <label className="text-sm font-medium" htmlFor="currency">
          Currency (optional)
        </label>
        <select
          id="currency"
          name="currency"
          aria-describedby="currency_help"
          value={currency}
          className="border-b border-background-hihglighted bg-transparent px-0 py-2 text-lg transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0"
          onChange={(e) => setCurrency(e.target.value || 'USD')}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
          <option value="CAD">CAD</option>
          <option value="AUD">AUD</option>
          <option value="CHF">CHF</option>
          <option value="SEK">SEK</option>
          <option value="NZD">NZD</option>
        </select>
        <small id="currency_help" className="text-sm italic text-foreground-hihglighted">
          The currency of the project. Will be used if the unit price is set.
        </small>
      </div>
      <Button type="submit" text={project ? 'Edit project' : 'Create project'} variant="primary" />
    </form>
  );
};

export default ProjectForm;
