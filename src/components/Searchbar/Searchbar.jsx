import { Component } from 'react';
import { IoMdSearch } from 'react-icons/io';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleInputChange = event => {
    this.setState({ search: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.search.trim() === '') {
      alert('Please enter a search word');
      return;
    }
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.SearchForm__button}>
            <IoMdSearch className={style.SearchForm__button__icon} />
          </button>

          <input
            className={style.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder={this.props.searchQuery || 'Search images and photos'}
            value={this.state.search}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};

export default Searchbar;
