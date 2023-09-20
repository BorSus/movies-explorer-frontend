import React from 'react';
import icon from '../../images/icon-search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  handleSearchClick,
  handleFilterCheckboxClick,
  isShortFilm,
  handleChangeInput,
  searchInput
}) {
  function onSearchClick(e) {
    e.preventDefault();
    handleSearchClick();
  }

  return (
    <section className='search-form'>
      <form className='search-form__search-bar'>
        <input
          type='text'
          className='search-form__input'
          placeholder='Фильм'
          value={searchInput}
          onChange={handleChangeInput}
        ></input>
        <button className='search-form__button' type='submit' onClick={onSearchClick || null}>
          <img src={icon} alt='иконка поиска' className='search-form__button-icon' />
        </button>
      </form>
      <FilterCheckbox
        label='Короткометражки'
        handleFilterCheckboxClick={handleFilterCheckboxClick}
        isShortFilm={isShortFilm}
      />
    </section>
  );
}
export default SearchForm;
