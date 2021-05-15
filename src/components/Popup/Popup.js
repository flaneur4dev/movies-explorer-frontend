import { memo } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

import './Popup.css';

const Popup = props => (
  <section className={`popup${props.isOpen ? ' popup_opened' : ''}`}>
    <div className="popup__wrapper">
      <Link to="/" className="popup__link">Главная</Link>
      <Navigation isMobile={true} />
      <button className="popup__button" onClick={props.onClose} />
    </div>
  </section>
)

export default memo(Popup)
