import { memo } from "react";
import './Footer.css';

const Footer = () => (
  <footer className="page__section footer">
    <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
    <div className="footer__wrapper">
      <p className="footer__copyright">{`© ${new Date().getFullYear()}`}</p>
      <ul className="footer__links">
        <li><a href="https://praktikum.yandex.ru/" target="_blank" className="footer__link">Яндекс.Практикум</a></li>
        <li><a href="https://github.com/" target="_blank" className="footer__link">Github</a></li>
        <li><a href="https://www.facebook.com/" target="_blank" className="footer__link">Facebook</a></li>
      </ul>
    </div>
  </footer>
)

export default memo(Footer)
