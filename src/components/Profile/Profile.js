import { memo, useState, useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import './Profile.css';

function Profile() {
  // времянка
  const { push } = useHistory();
  
  const [user, setUser] = useState({ name: 'Виталий', email: 'pochta@yandex.ru' });
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
    setUser(prevUser => ({ ...prevUser, [target.name]: target.value }))
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form" id="profile-form" name="profile-form" noValidate>
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
            onClick={() => push('/')}
          >
            Выйти из аккаунта
          </button>
        </div>

        <div className={`profile__container${!isEditable ? ' profile__container_hidden' : ''}`}>
          <p className="profile__errors">Тут будут сообщения с ошибками.</p>
          <button className="auth__button" type="submit" disabled={false}>Сохранить</button>
        </div>
      </form>
    </section>
  )
}

export default memo(Profile)
