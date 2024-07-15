import { twMerge } from 'tailwind-merge';

export interface Props {
  className?: string;
  children?: React.ReactNode;
}

const SectionWrapper = ({ className, children }: Props) => {
  return (
    <div
      className={twMerge(
        'container mx-auto flex w-full max-w-screen-sm flex-col flex-nowrap items-center justify-stretch gap-12 px-6 lg:max-w-screen-md xl:max-w-screen-lg',
        className
      )}
    >
      {children && children}
    </div>
  );
};

export default SectionWrapper;
