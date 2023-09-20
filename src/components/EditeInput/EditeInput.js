import React from 'react';

function EditeInput({
  title,
  value,
  type,
  isActive,
  placeholder,
  name,
  minLength,
  maxLength,
  pattern,
  handleChangeInput
}) {
  return (
    <div className='edite-input'>
      <p className='edite-input__title'>{title || ''}</p>
      <input
        className='edite-input__value'
        name={name}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        value={value || ''}
        disabled={!isActive}
        required
        placeholder={placeholder}
        onChange={handleChangeInput}
      />
    </div>
  );
}
export default EditeInput;
