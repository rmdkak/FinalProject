interface Props {
  errorsMessage: string | undefined;
  className?: string;
  size?: number;
}
export const InvalidText = ({ errorsMessage, className = "", size = 30 }: Props) => {
  if (errorsMessage === undefined) return <div className={`h-[${size}px] w-full flex items-center ${className}`}></div>;
  else
    return (
      <p className={`h-[${size}px] w-full flex items-center text-sm text-error font-normal ${className}`}>
        {errorsMessage}
      </p>
    );
};
