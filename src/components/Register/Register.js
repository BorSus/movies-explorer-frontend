import React, { useEffect, useState } from 'react';
import ValidInput from '../ValidInput/ValidInput';
import EntrySection from '../EntrySection/EntrySection';
import SubmitButton from '../SubmitButton/SubmitButton';
import { errors } from '../../utils/constants.js';
import { api } from '../../utils/MainApi.js';
function Register({ checkToken }) {
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
    setValueInputs({ ...valueInputs, [e.target.name]: e.target.value });
    setErrorInputs({ ...errorInputs, [e.target.name]: e.target.validationMessage });
    setValidInputs({ ...validInputs, [e.target.name]: e.target.validity.valid });
  }

  // Проверка валидации формы по валидности инпутов
  useEffect(() => {
    setIsValidForm(Object.values(validInputs).every(item => item === true));
  }, [validInputs]);

  //  Функция для submit формы EntrySection.
  async function handleSubmitForm() {
    try {
      setIsValidForm(false);
      await api.signup(valueInputs);
      await api.signin({ email: valueInputs.email, password: valueInputs.password });
      checkToken('/movies');
    } catch (error) {
      setIsValidForm(false);
      if (error === 'Ошибка: 409') {
        setTextError(errors.registerConflictEmail);
      } else {
        setTextError(errors.registerBadResponse);
      }
      console.error(`Ошибка при регистрации нового пользователя: ${error}`);
    } finally {
      console.info('Регистрация нового пользователя-завершено');
      setIsValidForm(true);
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
            pattern='^[A-Za-z0-9\- ]*$'
            handleChangeInput={handleChangeInput}
            value={valueInputs.name}
            error={errorInputs.name}
            isValid={validInputs.name}
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
          />
        </div>
        <SubmitButton
          textButton='Зарегистрироваться'
          type='entry'
          textError={textError}
          isValidForm={isValidForm}
          handleSubmitForm={handleSubmitForm}
        />
      </EntrySection>
    </main>
  );
}
export default Register;
