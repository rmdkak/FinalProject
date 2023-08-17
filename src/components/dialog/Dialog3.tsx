import useClickOutside from 'hooks/useClickOutside';
import { ReactNode, useRef } from 'react';
import BaseModal from './BaseModal';

const { Title } = Typography;
interface ModalProps {
  onClose: () => void;
  title?: string;
  content?: ReactNode;
}

const AlertModal: React.FC<ModalProps> = ({ title = 'Alert', content, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => onClose());

  return (
    <div>
      <div ref={ref}>
        <p style={{ marginBottom: '6px' }}>
          {title}
        </p>
        {content && <div>{content}</div>}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button onClick={() => onClose()}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;

// export const ModalWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;

//   width: 350px;

//   margin: 0 15px;
//   padding: 30px;

//   background-color: #ffffff;
//   border: 1px solid #ccc;
//   border-radius: 10px;

//   background-color: white;

//   border-radius: 20px;
//   box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

//   @media only screen and (max-width: 600px) {
//     width: 240px;
//   }
// `;