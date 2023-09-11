import React, { useState } from 'react';
import EditeInput from '../EditeInput/EditeInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';
function Profile({ user, onExiteClick }) {
  const navigate = useNavigate();
  const [isEditeActive, setIsEditeActive] = useState(false);
  function handleEditControlClick() {
    setIsEditeActive(true);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setIsEditeActive(false);
  }
  function handleExitClick() {
    onExiteClick();
    navigate('/');
  }
  return (
    <main className='profile'>
      <p className='profile__title'>Привет,{user.name || ''}!</p>
      <form className='profile__form'>
        <div className='profile__edits'>
          <EditeInput
            title='Имя'
            value={user.name}
            type='text'
            isActive={isEditeActive}
            placeholder='Введите имя'
          />
          <p className='profile__line'></p>
          <EditeInput
            title='E-mail'
            value={user.email}
            type='email'
            isActive={isEditeActive}
            placeholder='Введите e-mail'
          />
        </div>
        {isEditeActive && (
          <SubmitButton
            textButton='Сохранить'
            textError=''
            handleSubmitClick={handleSubmit}
            isError={false}
            type='profile'
          />
        )}
        {!isEditeActive && (
          <ul className='profile__controls'>
            <li className='profile__control' onClick={handleEditControlClick}>
              Редактировать
            </li>
            <li
              className='profile__control profile__control_type_signout'
              onClick={handleExitClick}
            >
              Выйти из аккаунта
            </li>
          </ul>
        )}
      </form>
    </main>
  );
}
export default Profile;
