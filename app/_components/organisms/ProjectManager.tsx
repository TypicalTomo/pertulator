'use client';
import { type Project } from '@/app/_types/Project';
import SectionWrapper from '../molecules/SectionWrapper';
import ProjectForm from '../molecules/ProjectForm';
import { loadProject, saveProject } from '@/app/_utils/project';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProjectManager = () => {
  const router = useRouter();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    const loadedProject = loadProject();

    if (loadedProject) {
      setProject(loadedProject);
    }
  }, []);

  const handleFormSubmit = (projectData: Project) => {
    saveProject(projectData);
    setProject(projectData);

    router.push('/project/estimate');
  };

  return (
    <section className="py-12 md:py-24">
      <SectionWrapper>
        <ProjectForm project={project} onSubmit={handleFormSubmit} />
      </SectionWrapper>
    </section>
  );
};

export default ProjectManager;
