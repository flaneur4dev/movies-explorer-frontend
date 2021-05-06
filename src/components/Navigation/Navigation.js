import { memo } from "react";
import { NavLink, Link } from "react-router-dom";

import './Navigation.css';

function Navigation(props) {
  return (
    <nav className={`navigation${props.isMobile ? ' navigation__mobile': ''}`}>
      <div className="navigation__wrapper">
        <NavLink exact to="/movies" activeClassName="navigation__link_active" className="navigation__link">Фильмы</NavLink>
        <NavLink to="/saved-movies" activeClassName="navigation__link_active" className="navigation__link">Сохранённые фильмы</NavLink>
      </div>
      <Link to="/profile" className="navigation__profile">Аккаунт</Link>
    </nav>
  )
}

export default memo(Navigation)
