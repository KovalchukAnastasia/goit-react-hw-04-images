import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export default function Modal({ closeModal, url, alt }) {
  const onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const onEscapeClick = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onEscapeClick);
    return () => {
      window.removeEventListener('keydown', onEscapeClick);
    };
  }, [closeModal]);

  return (
    <Overlay onClick={onBackdropClick}>
      <ModalWindow>
        <img src={url} alt={alt} />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  url: PropTypes.string,
  alt: PropTypes.string,
};
