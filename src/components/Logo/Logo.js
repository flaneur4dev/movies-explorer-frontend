import { memo } from "react";
import { Link } from "react-router-dom";
import logo from '../../images/pic__logo.svg'

import './Logo.css';

const Logo = props => (
  <Link to="/" className={`${props.isMobile ? 'logo__link' : ''}`}>
    <img src={logo} alt="Логотип" className="logo" />
  </Link>
)

export default memo(Logo)
