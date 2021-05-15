import { memo } from "react";
import './Preloader.css';

const Preloader = () => (
  <section className="preloader">
    <div className="preloader__container">
      <span className="preloader__round"></span>
    </div>
  </section>
)

export default memo(Preloader)
