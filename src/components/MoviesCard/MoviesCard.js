import { memo, useState } from "react";
import { minsToHours } from '../../utils/utils';

import './MoviesCard.css';

function MoviesCard(props) {
  //времянка
  const [isSaved, setIsSaved] = useState(false);
  const handleSaveClick = () => setIsSaved(prevState => !prevState);

  return (
    <article className="movie-card">
      <img
        src={`https://api.nomoreparties.co${props.movie?.image?.url}`}
        alt={props.movie?.nameRU ?? 'Постер'}
        className="movie-card__image"
      />
      <div className="movie-card__wrapper">
        <h2 className="movie-card__title">{props.movie?.nameRU ?? 'Крутой? фильмец!'}</h2>
        <button
          className={`movie-card__button${isSaved ? ' movie-card__button_red' : ''}`}
          type="button"
          onClick={handleSaveClick}
        />
      </div>
      <p className="movie-card__duration">{minsToHours(props.movie?.duration)}</p>
    </article>
  )
}

export default memo(MoviesCard)
