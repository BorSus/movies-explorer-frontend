import React, { useState, useEffect, useContext } from 'react';
import EditeInput from '../EditeInput/EditeInput';
import SubmitButton from '../SubmitButton/SubmitButton';
import { api } from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { errors } from '../../utils/constants.js';

function Profile({ checkToken }) {
  // переменная состояния запроса к серверу
  const [isLoading, setIsLoading] = useState(false);
  //Подписка на контекст данные пользователя
  const [currentUser, setСurrentUser] = useState(useContext(CurrentUserContext));
  //  переменная состояния значения EditeInput
  const [valueInputs, setValueInputs] = useState({
    name: currentUser.name,
    email: currentUser.email
  });
  //  переменная состояния значения валидности EditeInput
  const [validInputs, setValidInputs] = useState({
    name: true,
    email: true
  });
  //  переменная состояния  значение валидности формы
  const [isValidForm, setIsValidForm] = useState(false);
  // переменная состояния  значение ошибки с сервера
  const [textError, setTextError] = useState('');
  //  переменная состояния  значение активации редактирования
  const [isEditeActive, setIsEditeActive] = useState(false);
  // Обработчик изменения инпутов
  function handleChangeInput(e) {
    if (e.target.name === 'name' && e.target.validity.patternMismatch) {
      setTextError('поле Имя может содержать только латиницу, кириллицу, пробел или дефис');
    } else if (e.target.name === 'email' && e.target.validity.patternMismatch) {
      setTextError('поле E-mail должно содержать адрес электронной почты, например mail@mail.ru');
    } else {
      setTextError(e.target.validationMessage);
    }
    setValueInputs({ ...valueInputs, [e.target.name]: e.target.value });
    setValidInputs({ ...validInputs, [e.target.name]: e.target.validity.valid });
  }
  // Проверка валидации формы по валидности инпутов
  useEffect(() => {
    setIsValidForm(
      Object.values(validInputs).every(item => item === true) &&
        (currentUser.name !== valueInputs.name || currentUser.email !== valueInputs.email)
    );
  }, [validInputs, valueInputs, currentUser]);

  function handleEditControlClick() {
    setIsEditeActive(true);
  }
  //  Функция для submit формы Profile.
  async function handleSubmitForm() {
    try {
      setIsLoading(true);
      setTextError('');
      const editUser = await api.patchUserMe(valueInputs);
      setСurrentUser(editUser);
      alert('Данные пользователя изменены');
      setIsEditeActive(false);
    } catch (error) {
      if (error === 'Ошибка: 409') {
        setTextError(errors.profileConflictEmail);
      } else {
        setTextError(errors.profileBadResponse);
      }
      console.error(`Ошибка при регистрации нового пользователя: ${error}`);
    } finally {
      setIsLoading(false);
      console.info('Регистрация нового пользователя-завершено');
    }
  }
  async function handleExitClick() {
    await api.signout();
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('searchString');
    localStorage.removeItem('isShortFilm');
    checkToken('/');
  }
  return (
    <main className='profile'>
      <p className='profile__title'>Привет,{currentUser.name || ''}!</p>
      <form className='profile__form'>
        <div className='profile__edits'>
          <EditeInput
            title='Имя'
            name='name'
            type='text'
            minLength='2'
            maxLength='30'
            pattern='^[A-Za-zА-Яа-яЁё0-9\- ]*$'
            value={valueInputs.name}
            isActive={isEditeActive}
            placeholder='Введите имя'
            handleChangeInput={handleChangeInput}
            isLoading={isLoading}
          />
          <p className='profile__line'></p>
          <EditeInput
            title='E-mail'
            name='email'
            type='email'
            pattern='\S+@\S+\.\S+'
            value={valueInputs.email}
            isActive={isEditeActive}
            placeholder='Введите e-mail'
            handleChangeInput={handleChangeInput}
            isLoading={isLoading}
          />
        </div>
        {isEditeActive && (
          <SubmitButton
            textButton='Сохранить'
            type='profile'
            textError={textError}
            isValidForm={isValidForm}
            handleSubmitForm={handleSubmitForm}
            isLoading={isLoading}
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
