import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    url: PropTypes.string,
    alt: PropTypes.string,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeClick);
  }

  onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  onEscapeClick = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { alt, url } = this.props;
    return (
      <Overlay onClick={this.onBackdropClick}>
        <ModalWindow>
          <img src={url} alt={alt} />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;
