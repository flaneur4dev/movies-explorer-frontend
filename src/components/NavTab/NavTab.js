import { memo } from "react";
import './NavTab.css';

const NavTab = () => (
  <section className="nav-tab">
    <nav className="nav-tab__wrapper">
      <ul className="nav-tab__links">
        <li className="nav-tab__link"><a href="#project">О проекте</a></li>
        <li className="nav-tab__link"><a href="#techs">Технологии</a></li>
        <li className="nav-tab__link"><a href="#me">Студент</a></li>
      </ul>
    </nav>
  </section>
)

export default memo(NavTab)
