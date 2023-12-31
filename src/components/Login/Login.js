import React, { useState } from 'react';
import ValidInput from '../ValidInput/ValidInput';
import EntrySection from '../EntrySection/EntrySection';
import SubmitButton from '../SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';
function Login({ onEnterClick }) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState('');
  function handleSubmitClick(e) {
    e.preventDefault();
    onEnterClick();
    navigate('/movies');
  }
  return (
    <main className='login'>
      <EntrySection
        title='Рады видеть!'
        submit='Войти'
        linkInfo='Ещё не зарегистрированы?'
        link='Регистрация'
        path='/signup'
      >
        <div className='login__inputs'>
          <ValidInput title='E-mail' type='email' placeholder='Введите e-mail' />
          <ValidInput
            title='Пароль'
            type='password'
            error='Что-то пошло не так...'
            placeholder='Введите пароль'
          />
        </div>
        <SubmitButton
          textButton='Войти'
          handleSubmitClick={handleSubmitClick}
          isError={isError}
          type='entry'
          textError={textError}
        />
      </EntrySection>
    </main>
  );
}
export default Login;
