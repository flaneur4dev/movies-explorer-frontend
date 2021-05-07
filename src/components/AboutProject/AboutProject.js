import { memo } from "react";
import './AboutProject.css';

const AboutProject = () => (
  <section id="project" className="about-project">
    <h2 className="section-title">О проекте</h2>
    <div className="about-project__wrapper">
      <article>
        <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </article>
      <article>
        <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </article>
    </div>
    <div className="about-project__container">
      <p className="about-project__backend">1 неделя</p>
      <p className="about-project__frontend">4 недели</p>
    </div>
  </section>
)

export default memo(AboutProject)
