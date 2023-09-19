import React from 'react';
function SubmitButton({ textButton, textError, isValidForm, type, handleSubmitForm }) {
  function onSubmit(e) {
    e.preventDefault();
    handleSubmitForm();
  }
  return (
    <div className='submit'>
      <p className='submit__error'>{textError}</p>
      <button
        className={`submit__button 
        ${isValidForm ? `submit__button_type_${type}` : `submit__button_type_disactive`}`}
        type='submit'
        onClick={onSubmit}
      >
        {textButton}
      </button>
    </div>
  );
}
export default SubmitButton;
