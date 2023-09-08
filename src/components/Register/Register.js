import React from 'react';
import ValidInput from '../ValidInput/ValidInput';
import EntrySection from '../EntrySection/EntrySection';
function Register({}) {
  return (
    <EntrySection
      title='Добро пожаловать!'
      submit='Зарегистрироваться'
      linkInfo='Уже зарегистрированы?'
      link='Войти'
      path='/signin'
    >
      <ValidInput title='Имя' type='text' minLength='2' maxLength='30' />
      <ValidInput title='E-mail' type='email' />
      <ValidInput title='Пароль' type='password' error='Что-то пошло не так...' minLength='8' />
    </EntrySection>
  );
}
export default Register;
