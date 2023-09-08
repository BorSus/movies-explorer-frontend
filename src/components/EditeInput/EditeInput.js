import React from 'react';
function EditeInput({ title, value, type, isActive }) {
  return (
    <div className='edite-input'>
      <p className='edite-input__title'>{title || ''}</p>
      <input
        type={type}
        className='edite-input__value'
        value={value || ''}
        disabled={!isActive}
        required
        minLength='2'
        maxLength='30'
      />
    </div>
  );
}
export default EditeInput;
