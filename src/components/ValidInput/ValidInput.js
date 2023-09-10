import React from 'react';
function ValidInput({ title, type, error, minLength, maxLength, isValid }) {
  return (
    <div className='valid-input'>
      <p className='valid-input__title'>{title}</p>
      <input
        type={type}
        className={`valid-input__input ${!isValid && `valid-input_error`}`}
        minLength={minLength}
        maxLength={maxLength}
        required
      />
      <span className='valid-input__error'>{error}</span>
    </div>
  );
}
export default ValidInput;
