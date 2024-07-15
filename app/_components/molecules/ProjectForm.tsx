'use client';
import Button from '../atoms/Button';
import { useRouter } from 'next/navigation';

const ProjectForm = () => {
  const router = useRouter();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const projectData = Object.fromEntries(formData.entries());

    // TODO: Validate and save project data
    console.log(projectData);

    router.push('/project/estimate');
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
      <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-2">
        <label className="sr-only text-sm font-medium" htmlFor="project_name">
          Project name
        </label>
        <input
          type="text"
          id="project_name"
          name="project_name"
          placeholder="Enter project name"
          required
          className="border-b border-background-hihglighted bg-transparent px-0 py-2 font-heading text-lg font-semibold transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0 md:text-xl"
        />
      </div>
      <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-2">
        <label className="sr-only text-sm font-medium" htmlFor="project_description">
          Project description
        </label>
        <textarea
          id="project_description"
          name="project_description"
          placeholder="Enter project description"
          aria-describedby="project_description_help"
          rows={5}
          className="border-b border-background-hihglighted bg-transparent px-0 py-2 text-lg transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0"
        />
        <small id="project_description_help" className="text-sm italic text-foreground-hihglighted">
          A brief description of the project. This will be added on the PDF report. Leave empty if not applicable.
        </small>
      </div>
      <div className="flex flex-col flex-nowrap items-stretch justify-stretch gap-2">
        <label className="sr-only text-sm font-medium" htmlFor="project_manager">
          Project manager
        </label>
        <input
          type="text"
          id="project_manager"
          placeholder="Enter project manager's name"
          name="project_manager"
          aria-describedby="project_manager_help"
          className="border-b border-background-hihglighted bg-transparent px-0 py-2 text-lg transition duration-300 ease-in-out focus:border-primary focus:outline-none focus:ring-0"
        />
        <small id="project_manager_help" className="text-sm italic text-foreground-hihglighted">
          This person will be added on the PDF report as the project manager. Leave empty if not applicable.
        </small>
      </div>
      <Button type="submit" text="Create project" variant="primary" />
    </form>
  );
};

export default ProjectForm;
