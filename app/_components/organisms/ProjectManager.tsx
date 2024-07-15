import SectionWrapper from '../molecules/SectionWrapper';
import ProjectForm from '../molecules/ProjectForm';

const ProjectManager = () => {
  return (
    <section className="py-12 md:py-24">
      <SectionWrapper>
        <ProjectForm />
      </SectionWrapper>
    </section>
  );
};

export default ProjectManager;
