import React from 'react';
function SubmitButton({ textButton, textError, isValidForm, type, handleSubmitForm, isLoading }) {
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
        disabled={!isValidForm || isLoading}
        onClick={onSubmit}
      >
        {textButton}
      </button>
    </div>
  );
}
export default SubmitButton;
