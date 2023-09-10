import React from 'react';
function FilterCheckbox({ label }) {
  return (
    <div className='filterCheckbox'>
      <input type='checkbox' id='switch' className='filterCheckbox__trueCheckbox' />
      <label htmlFor='switch' className='filterCheckbox__falseCheckbox'></label>
      <label htmlFor='switch' className='filterCheckbox__label'>
        {label}
      </label>
    </div>
  );
}
export default FilterCheckbox;
