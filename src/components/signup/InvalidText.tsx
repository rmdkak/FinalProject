interface Props {
  errorsMessage: string | undefined;
}
export const InvalidText = ({ errorsMessage }: Props) => {
  if (errorsMessage === undefined) return <div className="h-[30px] w-full flex items-center"></div>;
  else
    return <p className="h-[30px] w-full flex items-center text-[12px] text-[#ED1B2C] font-[400]">{errorsMessage}</p>;
};
