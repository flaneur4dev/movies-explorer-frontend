import { memo } from "react";
import Portfolio from "../Portfolio/Portfolio";
import student from '../../images/pic__student.jpg';

import './AboutMe.css';

const AboutMe = () => (
  <section id="me" className="about-me">
    <h2 className="section-title">Студент</h2>
    <article className="student">
      <div className="student__wrapper">
        <h3 className="student__title">Виталий</h3>
        <p className="student__subtitle">Фронтенд-разработчик, 30 лет</p>
        <p className="student__description">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
        <ul className="student__links">
          <li><a href="https://www.facebook.com/" target="_blank" className="student__link">Facebook</a></li>
          <li><a href="https://github.com/" target="_blank" className="student__link">Github</a></li>
        </ul>
      </div>
      <img className="about-me__image" src={student} alt="Фото разработчика" />
    </article>

    <Portfolio />
  </section>
)

export default memo(AboutMe)
