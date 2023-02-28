import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, id } = this.props.image;
    return (
      <li
        className={style.ImageGalleryItem}
        onClick={() => this.props.onClick(id)}
      >
        <img
          src={webformatURL}
          alt={tags}
          className={style.ImageGalleryItem__image}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number,
    tags: PropTypes.string,
    webformatURL: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

// export default ImageGalleryItem;
