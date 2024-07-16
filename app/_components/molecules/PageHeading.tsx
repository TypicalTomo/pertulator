import { twMerge } from 'tailwind-merge';

export interface Props {
  title: string;
  align?: 'left' | 'center' | 'right';
  visuallyHidden?: boolean;
}

const PageHeading = ({ title, align = 'left', visuallyHidden = false }: Props) => {
  return (
    <div
      className={twMerge(
        "before:content-['']] relative flex w-full items-center justify-stretch gap-4 before:absolute before:bottom-1.5 before:left-0 before:h-full before:w-full before:border-b before:border-b-background-hihglighted",
        align === 'left' && 'flex-col',
        align === 'center' && 'flex-col',
        align === 'right' && 'flex-col-reverse',
        visuallyHidden && 'sr-only'
      )}
    >
      <h1
        className={twMerge(
          'relative bg-background font-heading text-3xl font-semibold text-foreground lg:text-5xl',
          align === 'left' && 'ml-0 mr-auto pr-3 text-left',
          align === 'center' && 'mx-auto px-3 text-center',
          align === 'right' && 'ml-auto mr-0 pl-3 text-right'
        )}
      >
        {title}
      </h1>
    </div>
  );
};

export default PageHeading;
