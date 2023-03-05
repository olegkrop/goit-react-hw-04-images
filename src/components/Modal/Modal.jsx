import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const { largeImageURL, tags } = image;

  return createPortal(
    <div className={style.Overlay} onClick={handleBackdropClick}>
      <div className={style.Modal}>
        <img src={largeImageURL} alt={tags}></img>
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string,
    largeImageURL: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
