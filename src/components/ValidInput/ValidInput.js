import React from 'react';
function ValidInput({
  title,
  type,
  minLength,
  maxLength,
  isValid,
  placeholder,
  name,
  value,
  error,
  handleChangeInput,
  pattern
}) {
  // Обработчик изменения input
  return (
    <div className='valid-input'>
      <p className='valid-input__title'>{title}</p>
      <input
        className={`valid-input__input ${!isValid ? `valid-input__input_error` : ''}`}
        name={name}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required
        placeholder={placeholder}
        value={value}
        onChange={handleChangeInput}
      />
      <span className='valid-input__error'>{error || ' '}</span>
    </div>
  );
}
export default ValidInput;
