import { memo } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import AddButton from "../AddButton/AddButton";

const SavedMovies = props => (
  <>
    <SearchForm handleToggle={props.handleToggle} onSubmit={props.onSubmit} />
    <section className="page__section movies">
      {props.isAppLoading && <Preloader />}

      <MoviesCardList
        info={props.info}
        movies={props.movies}
        handleAddMovie={props.handleAddMovie}
      >
        <AddButton count={props.count} movies={props.movies} handleClick={props.handleClick} />
      </MoviesCardList>
    </section>
  </>
)

export default memo(SavedMovies)
