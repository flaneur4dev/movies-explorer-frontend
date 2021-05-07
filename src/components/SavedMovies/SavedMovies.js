import { memo } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import AddButton from "../AddButton/AddButton";

function SavedMovies(props) {
  return (
    <section>
      <MoviesCardList movies={props.movies}>
        <AddButton />
      </MoviesCardList>
    </section>
  )
}

export default memo(SavedMovies)
