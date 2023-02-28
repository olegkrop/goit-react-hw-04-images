import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.image;
    return createPortal(
      <div className={style.Overlay} onClick={this.handleBackdropClick}>
        <div className={style.Modal}>
          <img src={largeImageURL} alt={tags}></img>
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
