import { memo } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <>
      {props.movies.length
        ? (
          <>
            <section className="movies-list">
              {props.movies.map(movie => <MoviesCard key={movie.id} movie={movie} />)}
            </section>
            {props.children}
          </>
        )
        : <div style={{ paddingTop: '60px', textAlign: 'center', fontSize: '20px' }}>Список пуст</div>
      }
    </>
  )
}

export default memo(MoviesCardList)
