import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    return (
      <ul className={style.ImageGallery}>
        {this.props.images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={this.props.onImageItemClick}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
    })
  ).isRequired,
  onImageItemClick: PropTypes.func.isRequired,
};
