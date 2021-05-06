import { memo } from "react";
// import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import Preloader from '../Preloader/Preloader';
import AddButton from "../AddButton/AddButton";

import './Movies.css';

function Movies(props) {
  return (
    <section className="page__section movies">
      {/* <Preloader /> */}
      {/* <SearchForm handleToggle={handleToggle} /> */}

      <MoviesCardList movies={props.movies}>
        <AddButton count={props.count} movies={props.movies} handleClick={props.handleClick} />
      </MoviesCardList>
    </section>
  )
}

export default memo(Movies)
