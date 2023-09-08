import React, { useState } from 'react';
import EditeInput from '../EditeInput/EditeInput';

function Profile({ user, onExiteClick }) {
  //переменная состояния = Статус активности редактирования
  const [isEditeActive, setIsEditeActive] = useState(false);
  const [isFailEdite, setFailEdite] = useState(false);
  //Функция активации редактирования профиля
  function handleEditControlClick() {
    setIsEditeActive(true);
  }
  // Сохранить изменения профиля
  function handleSubmit(e) {
    e.preventDefault();
    setIsEditeActive(false);
  }

  return (
    <section className='profile'>
      <p className='profile__title'>Привет,{user.name || ''}!</p>
      <form className='profile__form'>
        <EditeInput title='Имя' value={user.name} type='text' isActive={isEditeActive} />
        <p className='profile__line'></p>
        <EditeInput title='E-mail' value={user.email} type='email' isActive={isEditeActive} />
        {isEditeActive && (
          <div className='profile__submit-block'>
            {isFailEdite && (
              <p className='profile__submit-error'>При обновлении профиля произошла ошибка.</p>
            )}
            <button
              className={`profile__submit ${isFailEdite && `profile__submit_disactive`}`}
              type='submit'
              onClick={handleSubmit}
            >
              Сохранить
            </button>
          </div>
        )}
      </form>
      {!isEditeActive && (
        <ul className='profile__controls'>
          <li className='profile__edite-control' onClick={handleEditControlClick}>
            Редактировать
          </li>
          <li className='profile__signout-control' onClick={onExiteClick}>
            Выйти из аккаунта
          </li>
        </ul>
      )}
    </section>
  );
}
export default Profile;
