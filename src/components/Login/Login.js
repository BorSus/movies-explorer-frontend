import React, { useEffect, useState } from 'react';
import ValidInput from '../ValidInput/ValidInput';
import EntrySection from '../EntrySection/EntrySection';
import SubmitButton from '../SubmitButton/SubmitButton';
import { errors } from '../../utils/constants.js';
import { api } from '../../utils/MainApi.js';

function Login({ checkToken }) {
  // переменная состояния запроса к серверу
  const [isLoading, setIsLoading] = useState(false);
  //  переменная состояния значения ValidInput
  const [valueInputs, setValueInputs] = useState({
    email: '',
    password: ''
  });
  //  переменная состояния значения ошибок ValidInput
  const [errorInputs, setErrorInputs] = useState({
    email: '',
    password: ''
  });
  //  переменная состояния значения валидности ValidInput
  const [validInputs, setValidInputs] = useState({
    email: false,
    password: false
  });
  //  переменная состояния  значение валидности формы
  const [isValidForm, setIsValidForm] = useState(false);
  //  переменная состояния  значение ошибки submit
  const [textError, setTextError] = useState('');

  // Обработчик изменения инпутов
  function handleChangeInput(e) {
    if (e.target.name === 'email' && e.target.validity.patternMismatch) {
      setErrorInputs({
        ...errorInputs,
        [e.target.name]:
          'поле E-mail должно содержать адрес электронной почты, например mail@mail.ru '
      });
    } else {
      setErrorInputs({ ...errorInputs, [e.target.name]: e.target.validationMessage });
    }
    setValueInputs({ ...valueInputs, [e.target.name]: e.target.value });
    setValidInputs({ ...validInputs, [e.target.name]: e.target.validity.valid });
  }
  // Проверка валидации формы по валидности инпутов
  useEffect(() => {
    setIsValidForm(Object.values(validInputs).every(item => item === true));
  }, [validInputs]);

  //  Функция для submit формы login
  async function handleSubmitForm() {
    try {
      setIsLoading(true);
      setTextError('Идет загрузка...');
      await api.signin(valueInputs);
      checkToken('/movies');
    } catch (error) {
      if (error === 'Ошибка: 401') {
        setTextError(errors.loginBadPassword);
      } else if (error === 'Ошибка: 400') {
        setTextError(errors.loginNotToken);
      }
      console.error(`Ошибка при авторизации пользователя: ${error}`);
    } finally {
      setIsLoading(false);
      console.info('Авторизация пользователя-завершено');
    }
  }
  return (
    <main className='login'>
      <EntrySection
        title='Рады видеть!'
        submit='Войти'
        linkInfo='Ещё не зарегистрированы?'
        link='Регистрация'
        path='/signup'
        handleSubmitForm={handleSubmitForm}
        data={validInputs}
        isValidForm={isValidForm}
      >
        <div className='login__inputs'>
          <ValidInput
            name='email'
            title='E-mail'
            type='email'
            pattern='\S+@\S+\.\S+'
            placeholder='Введите e-mail'
            handleChangeInput={handleChangeInput}
            value={valueInputs.email}
            error={errorInputs.email}
            isValid={validInputs.email}
            isLoading={isLoading}
          />
          <ValidInput
            name='password'
            title='Пароль'
            type='password'
            minLength='8'
            placeholder='Введите пароль'
            pattern={null}
            handleChangeInput={handleChangeInput}
            value={valueInputs.password}
            error={errorInputs.password}
            isValid={validInputs.password}
            isLoading={isLoading}
          />
        </div>
        <SubmitButton
          textButton='Войти'
          type='entry'
          textError={textError}
          isValidForm={isValidForm}
          handleSubmitForm={handleSubmitForm}
          isLoading={isLoading}
        />
      </EntrySection>
    </main>
  );
}
export default Login;
