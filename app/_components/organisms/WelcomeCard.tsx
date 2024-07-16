'use client';
import { type Project } from '@/app/_types/Project';
import { useState } from 'react';
import SectionWrapper from '../molecules/SectionWrapper';
import SectionHeading from '../molecules/SectionHeading';
import Button from '../atoms/Button';
import { loadProject, clearProject } from '@/app/_utils/project';
import { useRouter } from 'next/navigation';

const WelcomeCard = () => {
  const [project, setProject] = useState<Project | undefined>(loadProject());
  const router = useRouter();

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
        <SectionHeading title="Welcome to PERTulator" align="left" />
        <p className="text-base leading-relaxed md:text-lg md:leading-relaxed lg:text-xl lg:leading-relaxed">
          PERTulator is a simple calculator for project management. It helps you estimate the time required to complete
          a project. It is based on the Program Evaluation and Review Technique (PERT) method, which is a statistical
          tool used in project management to analyze and represent the tasks involved in completing a given project.
          PERTulator is designed to be easy to use and understand, making it a valuable tool for project managers, team
          leaders, and anyone else involved in project planning and management.
        </p>
        <div className="flex w-full flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:justify-start">
          {project && <Button text="Continue with project" href="/project/estimate" variant="primary" />}
          <Button text="Create a new project" onClick={handleNewProject} variant={project ? 'tertiary' : 'primary'} />
          <Button text="Import JSON file" href="#calculator" variant="inverted" />
        </div>
      </SectionWrapper>
    </section>
  );
};

export default WelcomeCard;
