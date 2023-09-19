import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidInput from '../ValidInput/ValidInput';
import EntrySection from '../EntrySection/EntrySection';
import SubmitButton from '../SubmitButton/SubmitButton';
import { errors } from '../../utils/constants.js';
import { api } from '../../utils/MainApi.js';

function Login({ checkToken }) {
  const navigate = useNavigate();
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
    setValueInputs({ ...valueInputs, [e.target.name]: e.target.value });
    setErrorInputs({ ...errorInputs, [e.target.name]: e.target.validationMessage });
    setValidInputs({ ...validInputs, [e.target.name]: e.target.validity.valid });
  }
  // Проверка валидации формы по валидности инпутов
  useEffect(() => {
    setIsValidForm(Object.values(validInputs).every(item => item === true));
  }, [valueInputs]);

  //  Функция для submit формы EntrySection.
  async function handleSubmitForm() {
    try {
      const user = await api.signin(valueInputs);
      console.log(user.message);
      checkToken('/movies');
    } catch (error) {
      if (error === 'Ошибка: 401') {
        setTextError(errors.loginBadPassword);
      } else {
        setTextError(errors.loginNotToken);
      }
      console.error(`Ошибка при авторизации пользователя: ${error}`);
    } finally {
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
          textButton='Войти'
          type='entry'
          textError={textError}
          isValidForm={isValidForm}
          handleSubmitForm={handleSubmitForm}
        />
      </EntrySection>
    </main>
  );
}
export default Login;
