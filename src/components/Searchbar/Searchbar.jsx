import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

const Searchbar = ({ onSubmit, searchQuery }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = event => {
    setSearch(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (search.trim() === '') {
      alert('Please enter a search word');
      return;
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.SearchForm__button}>
          <IoMdSearch className={style.SearchForm__button__icon} />
        </button>
        <input
          className={style.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder={'Search images and photos'}
          value={search}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};

export default Searchbar;
