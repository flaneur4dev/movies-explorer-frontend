import { memo, useState, useRef, useEffect, useContext } from "react";
import { CurrentUserContext } from '../../context/CurrentUserContext';

import './Profile.css';

function Profile(props) {
  const { name, email } = useContext(CurrentUserContext);

  const [user, setUser] = useState({ name, email });
  const [isEditable, setIsEditable] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (isEditable) {
      inputRef.current.focus();
      inputRef.current.select()
    }
  }, [isEditable])

  function handleEditableClick() {
    setIsEditable(prevState => !prevState);
  }

  function handleInputChange({ target }) {
    setUser(prevUser => ({ ...prevUser, [target.name]: target.value }));
    props.handleChange(target)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser(user);
    setIsEditable(prevState => !prevState);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {name}!</h2>
      <form className="profile__form" id="profile-form" name="profile-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="profile__wrapper">
          <label className="profile__label">
            Имя
            <input
              ref={inputRef}
              type="name"
              className="profile__input"
              id="name"
              name="name"
              pattern="^[а-яёЁА-Я\w,.-]+(\s[а-яёЁА-Я\w,.-]+)*"
              required
              disabled={!isEditable}
              value={user.name || ''}
              onChange={handleInputChange}
            />
          </label>

          <label className="profile__label">
            E-mail
            <input
              type="email"
              className="profile__input"
              id="email"
              name="email"
              pattern="^[\w.-]{2,}@([\w-]{2,}\.)+[\w-]{2,}"
              required
              disabled={!isEditable}
              value={user.email || ''}
              onChange={handleInputChange}
            />
          </label>
        </fieldset>

        <div className={`profile__container${isEditable ? ' profile__container_hidden' : ''}`}>
          <button
            className="profile__button"
            type="button"
            onClick={handleEditableClick}
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_red"
            type="button"
            onClick={props.onSignOut}
          >
            Выйти из аккаунта
          </button>
        </div>

        <div className={`profile__container${!isEditable ? ' profile__container_hidden' : ''}`}>
          <p className="auth__errors">{props.info}</p>
          <button className="auth__button" type="submit" disabled={props.isDisabled}>Сохранить</button>
        </div>
      </form>
    </section>
  )
}

export default memo(Profile)
