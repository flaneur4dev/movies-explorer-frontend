import { memo } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <>
      {/* {props.movies.length */}
        {/* // ? ( */}
          {/* <> */}
            <section className="movies-list">
              {props.movies.map((movie, i) => (
                <MoviesCard
                  key={i}
                  movie={movie}
                  handleAddMovie={props.handleAddMovie}
                  // isSaved={props.isSaved}
                />
              ))}
            </section>
            {props.children}
          {/* </> */}
          {/* // ) */}
        {/* // : <div style={{ paddingTop: '60px', textAlign: 'center', fontSize: '20px' }}>{props.info}</div> */}
        <div style={{ paddingTop: '60px', textAlign: 'center', fontSize: '20px' }}>{props.info}</div>
      {/* } */}
    </>
  )
}

export default memo(MoviesCardList)
