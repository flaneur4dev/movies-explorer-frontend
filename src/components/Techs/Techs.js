import { memo } from "react";
import './Techs.css';

const Techs = () => (
  <section id="techs" className="techs">
    <h2 className="section-title">Технологии</h2>
    <h3 className="techs_title">7 технологий</h3>
    <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
    <ul className="techs__wrapper">
      {['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'].map((item, i) => <li key={i} className="techs__item">{item}</li>)}
    </ul>
  </section>
)

export default memo(Techs)
