import SectionWrapper from '../molecules/SectionWrapper';
import PertulatorLogo from '../atoms/PertulatorLogo';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='sticky top-0 bg-background xl:bg-transparent xl:pointer-events-none'>
      <SectionWrapper className='py-3 xl:flex-row xl:max-w-none xl:py-6'>
        <Link href='/' className="flex h-12 w-12 items-center justify-center xl:w-24 xl:h-24 xl:pointer-events-auto">
          <PertulatorLogo />
        </Link>
      </SectionWrapper>
    </header>
  );
};

export default Header;
