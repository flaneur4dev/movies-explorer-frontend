import { memo } from "react";
import { useHistory } from 'react-router-dom';

import './NotFound.css';

function NotFound() {
  const { goBack } = useHistory();

  return (
    <section className="not-found">
      <div className="not-found__wrapper">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__description">Страница не найдена</p>
      </div>
      <button className="not-found__button" onClick={goBack}>Назад</button>
    </section>
  )
}

export default memo(NotFound)
