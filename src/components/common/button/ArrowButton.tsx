import arrowIcon from "assets/svgs/arrowIcon.svg";

interface Props {
  isOpen: boolean;
  openHandler: (target: any) => void;
  statusToOpen: string | boolean;
  statusToClose: string | boolean;
  className: string;
}
// "flex w-4 h-4 contents-center"
export const ArrowButton = ({ isOpen, openHandler, statusToOpen, statusToClose, className }: Props) => {
  const changeOpen = () => {
    isOpen ? openHandler(statusToClose) : openHandler(statusToOpen);
  };
  return (
    <button type="button" onClick={changeOpen} className={className}>
      {isOpen ? <img className="rotate-180" src={arrowIcon} /> : <img src={arrowIcon} />}
    </button>
  );
};
