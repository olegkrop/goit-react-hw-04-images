import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, tags, id } = image;
  return (
    <li className={style.ImageGalleryItem} onClick={() => onClick(id)}>
      <img
        src={webformatURL}
        alt={tags}
        className={style.ImageGalleryItem__image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number,
    tags: PropTypes.string,
    webformatURL: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
