import React, { useEffect, useState } from 'react';

function EditeInput({ title, value, type, isActive, placeholder }) {
  const [inputValue, setInputValue] = useState('');
  function handleChange(e) {
    setInputValue(e.target.value);
  }
  useEffect(() => {
    setInputValue(value);
  }, []);
  return (
    <div className='edite-input'>
      <p className='edite-input__title'>{title || ''}</p>
      <input
        type={type}
        className='edite-input__value'
        value={inputValue || ''}
        disabled={!isActive}
        required
        minLength='2'
        maxLength='30'
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
export default EditeInput;
