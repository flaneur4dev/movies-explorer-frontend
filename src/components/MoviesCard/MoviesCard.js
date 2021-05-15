import { memo } from "react";
import { useLocation } from 'react-router-dom';
import { minsToHours } from '../../utils/utils';

import './MoviesCard.css';

function MoviesCard(props) {
  const { pathname } = useLocation();

  const movie = props.movie.movieId
    ? props.movie
    : {
        nameRU: props.movie?.nameRU || 'н.д',
        nameEN: props.movie?.nameEN || 'н.д',
        country: props.movie?.country || 'н.д',
        director: props.movie?.director || 'н.д',
        duration: props.movie?.duration,
        year: props.movie.year || 'н.д',
        description: props.movie.description || 'н.д',
        movieId: props.movie.id || 'н.д',
        image: `https://api.nomoreparties.co${props.movie?.image?.url}`,
        thumbnail: `https://api.nomoreparties.co${props.movie?.image?.formats?.thumbnail?.url}`,
        trailer: props.movie?.trailerLink,
        isSaved: props.movie?.isSaved,
        _id: props.movie?._id
      }

  function handleSaveClick() {
    props.handleAddMovie(movie)
  }

  return (
    <article className="movie-card">
      <a href={movie.trailer} target="_blank">
        <img
          src={movie.image}
          alt={movie.nameRU}
          className="movie-card__image"
        />
      </a>
      <div className="movie-card__wrapper">
        <h2 className="movie-card__title">{movie.nameRU}</h2>
        <button
          className={`movie-card__button${movie.isSaved ? ' movie-card__button_red' : ''}${pathname === '/saved-movies' ? ' movie-card__button_delete' : ''}`}
          type="button"
          onClick={handleSaveClick}
        />
      </div>
      <p className="movie-card__duration">{minsToHours(movie.duration)}</p>
    </article>
  )
}

export default memo(MoviesCard)
