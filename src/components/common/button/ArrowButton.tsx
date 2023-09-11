import arrowIcon from "assets/svgs/arrowIcon.svg";

interface Props {
  isOpen: boolean;
  openHandler: (target: any) => void;
  statusToOpen: string | boolean;
  statusToClose: string | boolean;
  className: string;
}

export const ArrowButton = ({ isOpen, openHandler, statusToOpen, statusToClose, className = "" }: Props) => {
  const changeOpen = () => {
    isOpen ? openHandler(statusToClose) : openHandler(statusToOpen);
  };
  return (
    <div onClick={changeOpen} className={className}>
      {isOpen ? <img className="rotate-180" src={arrowIcon} /> : <img src={arrowIcon} />}
    </div>
  );
};
