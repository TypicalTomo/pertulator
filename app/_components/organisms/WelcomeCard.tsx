import SectionWrapper from '../molecules/SectionWrapper';
import SectionHeading from '../molecules/SectionHeading';
import Button from '../atoms/Button';

const WelcomeCard = () => {
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
        <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-start md:gap-8">
          <Button text="Create a project" href="/project/new" variant="primary" />
          <Button text="Import JSON file" href="#calculator" variant="inverted" />
        </div>
      </SectionWrapper>
    </section>
  );
};

export default WelcomeCard;
