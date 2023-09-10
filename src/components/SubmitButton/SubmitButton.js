import React from 'react';
function SubmitButton({ textButton, textError, handleSubmitClick, isError, type }) {
  console.log(isError);
  return (
    <div className='submit'>
      <p className='submit__error'>{textError}</p>
      <button
        className={`submit__button  
        ${!isError && `submit__button_type_${type}`}
        ${isError && `submit__button_type_disactive`}`}
        type='submit'
        onClick={handleSubmitClick}
      >
        {textButton}
      </button>
    </div>
  );
}
export default SubmitButton;
