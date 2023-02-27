import PropTypes from 'prop-types';
import style from './Button.module.css';

export function Button({ onClick }) {
  return (
    <button onClick={onClick} type="button" className={style.Button}>
      Load More
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
