import React from 'react';
import ValidInput from '../ValidInput/ValidInput';
import EntrySection from '../EntrySection/EntrySection';
import { useNavigate } from 'react-router-dom';
function Login({ onEnterClick }) {
  const navigate = useNavigate;

  return (
    <EntrySection
      title='Рады видеть!'
      submit='Войти'
      linkInfo='Ещё не зарегистрированы?'
      link='Регистрация'
      path='/signup'
      handleSubmit={onEnterClick}
    >
      <ValidInput title='E-mail' type='email' />
      <ValidInput title='Пароль' type='password' error='Что-то пошло не так...' />
    </EntrySection>
  );
}
export default Login;
