interface Props {
  errorsMessage: string | undefined;
  className?: string;
}
export const InvalidText = ({ errorsMessage, className = "" }: Props) => {
  if (errorsMessage === undefined) return <div className="h-[30px] w-full flex items-center"></div>;
  else
    return (
      <p className={`h-[30px] w-full flex items-center text-[12px] text-error font-normal ${className}`}>
        {errorsMessage}
      </p>
    );
};
