import React from 'react';
// import styled, { css } from 'styled-components';

interface ModalProps {
  children?: React.ReactNode;
  $type?: 'form' | undefined;
  name?: string | undefined;
}

// const ModalWrapper = styled.div<{ $type: 'form' | undefined }>`
//   position: fixed;
//   top: 5%;
//   left: 50%;

//   transform: translate(-50%);

//   z-index: 2000;

//   ${props => {
//     switch (props.$type) {
//       case 'form':
//         return css`
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//         `;
//     }
//   }}
// `;

// const ModalBackground = styled.div<{ $type: 'form' | undefined }>`
//   position: fixed;
//   left: 0;
//   top: 0;

//   width: 100vw;
//   height: 100vh;

//   background-color: rgba(0, 0, 0, 0.4);
//   z-index: 1000;

//   ${props => {
//     switch (props.$type) {
//       case 'form':
//         return css`
//           background-color: rgba(0, 0, 0, 0.3);
//         `;
//     }
//   }}
// `;

const BaseModal: React.FC<ModalProps> = ({ children, $type, ...props }) => {
  return (
    <>
      <div $type={$type}>
        <div $type={$type} {...props}>
          {children}
        </div>
      </div>
    </>
  );
};
export default BaseModal;
