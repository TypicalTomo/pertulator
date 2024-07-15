import SectionWrapper from '../molecules/SectionWrapper';
import TaskForm from '../molecules/TaskForm';

const EstimateManager = () => {
    return (
      <section className="py-12 md:py-24">
        <SectionWrapper>
            TODO: Task list
            <hr className='border-none bg-background-hihglighted h-px w-full' />
            <TaskForm />
            <hr className='border-none bg-background-hihglighted h-px w-full' />
            TODO: Result
            <hr className='border-none bg-background-hihglighted h-px w-full' />
            TODO: Actions
        </SectionWrapper>
      </section>
    );
  };
  
  export default EstimateManager;
  