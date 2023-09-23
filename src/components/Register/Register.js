import React, { useEffect, useState } from 'react';
import ValidInput from '../ValidInput/ValidInput';
import EntrySection from '../EntrySection/EntrySection';
import SubmitButton from '../SubmitButton/SubmitButton';
import { errors } from '../../utils/constants.js';
import { api } from '../../utils/MainApi.js';
function Register({ checkToken }) {
  // переменная состояния запроса к серверу
  const [isLoading, setIsLoading] = useState(false);
  //  переменная состояния значения ValidInput
  const [valueInputs, setValueInputs] = useState({
    name: '',
    email: '',
    password: ''
  });
  //  переменная состояния значения ошибок ValidInput
  const [errorInputs, setErrorInputs] = useState({
    name: '',
    email: '',
    password: ''
  });
  //  переменная состояния значения валидности ValidInput
  const [validInputs, setValidInputs] = useState({
    name: false,
    email: false,
    password: false
  });
  //  переменная состояния  значение валидности формы
  const [isValidForm, setIsValidForm] = useState(false);
  // переменная состояния  значение ошибки с сервера
  const [textError, setTextError] = useState('');
  // Обработчик изменения инпутов
  function handleChangeInput(e) {
    if (e.target.name === 'name' && e.target.validity.patternMismatch) {
      setErrorInputs({
        ...errorInputs,
        [e.target.name]: 'поле Имя может содержать только латиницу, кириллицу, пробел или дефис'
      });
    } else if (e.target.name === 'email' && e.target.validity.patternMismatch) {
      setErrorInputs({
        ...errorInputs,
        [e.target.name]: 'поле E-mail должно содержать адрес электронной, например mail@mail.ru '
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

  //  Функция для submit формы Register.
  async function handleSubmitForm() {
    try {
      setIsLoading(true);
      setIsValidForm(false);
      setTextError('Идет загрузка...');
      await api.signup(valueInputs);
      await api.signin({ email: valueInputs.email, password: valueInputs.password });
      checkToken('/movies');
    } catch (error) {
      if (error === 'Ошибка: 409') {
        setTextError(errors.registerConflictEmail);
      } else {
        setTextError(errors.registerBadResponse);
      }
      console.error(`Ошибка при регистрации нового пользователя: ${error}`);
    } finally {
      setIsLoading(false);
      setIsValidForm(true);
      console.info('Регистрация нового пользователя-завершено');
    }
  }

  return (
    <main className='register'>
      <EntrySection
        title='Добро пожаловать!'
        linkInfo='Уже зарегистрированы?'
        link='Войти'
        path='/signin'
        handleSubmitForm={handleSubmitForm}
        data={valueInputs}
      >
        <div className='register__inputs'>
          <ValidInput
            name='name'
            title='Имя'
            type='text'
            minLength='2'
            maxLength='30'
            placeholder='Введите имя'
            pattern='^[A-Za-zА-Яа-яЁё0-9\- ]*$'
            handleChangeInput={handleChangeInput}
            value={valueInputs.name}
            error={errorInputs.name}
            isValid={validInputs.name}
            isLoading={isLoading}
          />
          <ValidInput
            name='email'
            title='E-mail'
            type='email'
            placeholder='Введите e-mail'
            pattern='\S+@\S+\.\S+'
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
          textButton='Зарегистрироваться'
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
export default Register;
