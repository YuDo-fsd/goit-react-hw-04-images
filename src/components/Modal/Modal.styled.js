import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalClass = styled.div`
  position: relative;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const CloseBtn = styled.div`
  background-color: rgba(0, 0, 0, 0);
  filter: drop-shadow(0 0 1em White);
  border: none;
  position: absolute;
  right: 15px;
  top: 15px;
  }

  &:hover,
  &:focus {
    color: rgb(251, 000, 000);
  }

  &:active {
    color: rgb(251, 000, 000);
  }
`;
