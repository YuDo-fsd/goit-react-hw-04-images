// import * as basicLightbox from 'basiclightbox';
import { CloseBtn, ModalClass, Overlay } from './Modal.styled';

import { Component } from 'react';
import { createPortal } from 'react-dom';
import { IoCloseCircleSharp } from 'react-icons/io5';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageUrl, altName } = this.props.modalData;
    return createPortal(
      <Overlay onClick={this.handleBackdrop}>
        <ModalClass>
          <img src={largeImageUrl} alt={altName} />

          <CloseBtn type="button" onClick={this.props.onClose}>
            <IoCloseCircleSharp size={32} />
          </CloseBtn>
        </ModalClass>
      </Overlay>,
      modalRoot
    );
  }
}
