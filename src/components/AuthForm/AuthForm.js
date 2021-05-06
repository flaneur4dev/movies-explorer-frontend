import { memo } from "react";
import { Link } from "react-router-dom";
import Logo from '../Logo/Logo';

import './AuthForm.css';

function AuthForm(props) {

  return (
    <section className="auth">
      <Logo isMobile={true} />
      <h2 className="auth__title">{props.title}</h2>

      {/* <form className="auth__form" id="auth-form" name="auth-form" onSubmit={handleSubmit} noValidate> */}
      <form className="auth__form" id="auth-form" name="auth-form" noValidate>
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
              // value={inputValue.email || ''}
              // onChange={handleInputChange}
              />
              {/* <span className="popup__input-error">{inputValue.email ? props.errors.email : ''}</span> */}
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
            // value={inputValue.email || ''}
            // onChange={handleInputChange}
            />
            {/* <span className="popup__input-error">{inputValue.email ? props.errors.email : ''}</span> */}
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
            // value={inputValue.password || ''}
            // onChange={handleInputChange}
            />
            {/* <span className="popup__input-error">{inputValue.password ? props.errors.password : ''}</span> */}
          </label>
        </fieldset>

        <button className="auth__button" type="submit" disabled={props.isDisabled}>{props.submitButton}</button>
      </form>

      <footer className="auth__footer">
        <span className="auth__footer-ask">{props.ask}</span>
        <Link className="auth__footer-link" to={props.path}>{props.welcome}</Link>
      </footer>
    </section>
  )
}

export default memo(AuthForm)
