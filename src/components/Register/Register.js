import React, { useState } from 'react';
import ValidInput from '../ValidInput/ValidInput';
import EntrySection from '../EntrySection/EntrySection';
import SubmitButton from '../SubmitButton/SubmitButton';
import { errors } from '../../utils/constants.js';
function Register() {
  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState('');
  function handleSubmitClick(e) {
    e.preventDefault();
    setIsError(true);
    setTextError(errors.registerConflictEmail);
  }
  return (
    <main className='register'>
      <EntrySection
        title='Добро пожаловать!'
        linkInfo='Уже зарегистрированы?'
        link='Войти'
        path='/signin'
      >
        <div className='register__inputs'>
          <ValidInput
            title='Имя'
            type='text'
            minLength='2'
            maxLength='30'
            isValid={true}
            placeholder='Введите имя'
          />
          <ValidInput title='E-mail' type='email' isValid={true} placeholder='Введите e-mail' />
          <ValidInput
            title='Пароль'
            type='password'
            error='Что-то пошло не так...'
            minLength='8'
            isValid={false}
            placeholder='Введите пароль'
          />
        </div>
        <SubmitButton
          textButton='Зарегистрироваться'
          handleSubmitClick={handleSubmitClick}
          isError={isError}
          type='entry'
          textError={textError}
        />
      </EntrySection>
    </main>
  );
}
export default Register;
