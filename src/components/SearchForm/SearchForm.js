import icon from '../../images/icon-search.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ handleSearchClick }) {
  function onSearchClick(e) {
    e.preventDefault();
    handleSearchClick();
  }
  return (
    <section className='searchForm'>
      <form className='searchForm__searchBar'>
        <input type='text' className='searchForm__input' placeholder='Фильм'></input>
        <button className='searchForm__button' type='submit' onClick={onSearchClick || null}>
          <img src={icon} alt='иконка поиска' className='searchForm__button-icon' />
        </button>
      </form>
      <FilterCheckbox label='Короткометражки' />
    </section>
  );
}
export default SearchForm;
