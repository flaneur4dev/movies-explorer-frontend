import { memo } from "react";
import './SearchForm.css';

function SearchForm(props) {
  return (
    <form className="page__section search-form">
      <fieldset className="search-form__wrapper">
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
        />
        <label className="search-form__label">
          <input type="checkbox" className="search-form__check" onChange={props.handleToggle} />
          <div  className="search-form__pseudo-check" />
          Короткометражки
        </label>
      </fieldset>
      <button type="submit" className="search-form__button">Найти</button>
    </form>
  )
}

export default memo(SearchForm)
