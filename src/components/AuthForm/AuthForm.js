import { memo, useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../Logo/Logo';

import './AuthForm.css';

function AuthForm(props) {
  const [inputValue, setInputValue] = useState({});

  function handleInputChange({ target }) {
    setInputValue(prevState => ({ ...prevState, [target.name]: target.value }));
    props.handleChange(target)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(inputValue)
  }

  return (
    <section className="auth">
      <Logo isMobile={true} />
      <h2 className="auth__title">{props.title}</h2>

      <form className="auth__form" id="auth-form" name="auth-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="auth__wrapper">
          {props.isRegister &&
            <label className="auth__label">
              Имя
              <input
                type="name"
                className="auth__input"
                id="name"
                name="name"
                pattern="^[а-яёЁА-Я\w,.-]+(\s[а-яёЁА-Я\w,.-]+)*"
                required
                value={inputValue.name || ''}
                onChange={handleInputChange}
              />
              <p className="auth__input-error">{inputValue.name ? props.errors.name : ''}</p>
            </label>
          }

          <label className="auth__label">
            E-mail
            <input
              type="email"
              className="auth__input"
              id="email"
              name="email"
              pattern="^[\w.-]{2,}@([\w-]{2,}\.)+[\w-]{2,}"
              required
              value={inputValue.email || ''}
              onChange={handleInputChange}
            />
            <p className="auth__input-error">{inputValue.email ? props.errors.email : ''}</p>
          </label>

          <label className="auth__label">
            Пароль
            <input
              type="password"
              className="auth__input"
              id="password"
              name="password"
              pattern="^\w{8,16}"
              required
              value={inputValue.password || ''}
              onChange={handleInputChange}
            />
            <p className="auth__input-error">{inputValue.password ? props.errors.password : ''}</p>
          </label>
        </fieldset>

        <div className='auth__container'>
          <p className="auth__errors">{props.info}</p>
          <button className="auth__button" type="submit" disabled={props.isDisabled}>{props.submitButton}</button>
        </div>
      </form>

      <footer className="auth__footer">
        <span className="auth__footer-ask">{props.ask}</span>
        <Link className="auth__footer-link" to={props.path}>{props.welcome}</Link>
      </footer>
    </section>
  )
}

export default memo(AuthForm)
