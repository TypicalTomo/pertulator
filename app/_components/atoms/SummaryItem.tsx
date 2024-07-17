export interface Props {
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

const SummaryItem = ({ message, variant = 'info' }: Props) => {
  return (
    <div
      className={`flex flex-col gap-1 border-l-4 p-3 ${variant === 'info' ? 'border-primary' : variant === 'success' ? 'border-green-500' : variant === 'warning' ? 'border-yellow-500' : 'border-red-500'}`}
    >
      <p className="text-sm" dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
};

export default SummaryItem;