import { memo } from "react";
import { portfolio } from '../../utils/utils';
import arrow from '../../images/pic__link.svg';

import './Portfolio.css';

const Portfolio = () => (
  <>
    <h4 className="portfolio">Портфолио</h4>
    {portfolio.map(({ title, link }, i) => (
      <div key={i} className="portfolio__item">
        <span>{title}</span>
        <a href={link} target="_blank"><img className="portfolio__link" src={arrow} alt="Стрелка" /></a>
      </div>
    ))}
  </>
)

export default memo(Portfolio)
