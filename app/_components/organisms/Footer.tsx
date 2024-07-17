import SectionWrapper from '../molecules/SectionWrapper';
import TomowebLogo from '../atoms/TomowebLogo';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-6 lg:fixed lg:bottom-0">
      <SectionWrapper className="lg:max-w-none lg:flex-row xl:max-w-none">
        <Link
          href="https://tomoweb.dev"
          target="_blank"
          className="flex h-8 w-32 items-center justify-center lg:pointer-events-auto lg:h-6 lg:w-24 2xl:h-12 2xl:w-48"
        >
          <TomowebLogo />
        </Link>
      </SectionWrapper>
    </footer>
  );
};

export default Footer;
