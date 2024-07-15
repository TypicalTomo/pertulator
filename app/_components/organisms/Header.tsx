import SectionWrapper from '../molecules/SectionWrapper';
import PertulatorLogo from '../atoms/PertulatorLogo';

const Header = () => {
  return (
    <header className='sticky top-0 bg-background xl:bg-transparent'>
      <SectionWrapper className='py-3 xl:flex-row xl:max-w-none xl:py-6'>
        <div className="flex h-12 w-12 items-center justify-center xl:w-24 xl:h-24">
          <PertulatorLogo />
        </div>
      </SectionWrapper>
    </header>
  );
};

export default Header;
