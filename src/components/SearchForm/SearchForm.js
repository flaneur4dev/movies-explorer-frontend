import { memo, useState } from "react";
import './SearchForm.css';

function SearchForm(props) {
  const [filter, setFilter] = useState('');

  function handleInputChange({ target }) {
    setFilter(target.value);
    // props.handleChange(target)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(filter)
  }

  return (
    <form className="page__section search-form" id="search-form" name="search-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="search-form__wrapper">
        <input
          type="text"
          className="search-form__input"
          id="film"
          name="film"
          placeholder="Фильм"
          required
          value={filter || ''}
          onChange={handleInputChange}
        />
        <label className="search-form__label">
          <input type="checkbox" className="search-form__check" onChange={props.handleToggle} />
          <div  className="search-form__pseudo-check" />
          Короткометражки
        </label>
      </fieldset>
      <button type="submit" className="search-form__button" disabled={!filter}>Найти</button>
      {/* <button type="submit" className="search-form__button" disabled={props.isDisabled}>Найти</button> */}
    </form>
  )
}

export default memo(SearchForm)
