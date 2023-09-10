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
    <EntrySection
      title='Добро пожаловать!'
      linkInfo='Уже зарегистрированы?'
      link='Войти'
      path='/signin'
    >
      <div className='register__inputs'>
        <ValidInput title='Имя' type='text' minLength='2' maxLength='30' isValid={true} />
        <ValidInput title='E-mail' type='email' isValid={true} />
        <ValidInput
          title='Пароль'
          type='password'
          error='Что-то пошло не так...'
          minLength='8'
          isValid={false}
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
  );
}
export default Register;
