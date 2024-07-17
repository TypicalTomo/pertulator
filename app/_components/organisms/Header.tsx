import SectionWrapper from '../molecules/SectionWrapper';
import PertulatorLogo from '../atoms/PertulatorLogo';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-background-hihglighted bg-background lg:pointer-events-none lg:fixed lg:left-0 lg:border-none lg:bg-transparent">
      <SectionWrapper className="py-3 lg:max-w-none lg:flex-row lg:py-6 xl:max-w-none">
        <Link href="/" className="flex h-12 w-12 items-center justify-center lg:pointer-events-auto lg:h-24 lg:w-24">
          <PertulatorLogo />
        </Link>
      </SectionWrapper>
    </header>
  );
};

export default Header;
