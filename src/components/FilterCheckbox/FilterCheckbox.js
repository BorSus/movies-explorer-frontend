import React from 'react';
function FilterCheckbox({ label }) {
  return (
    <div className='filter-checkbox'>
      <input type='checkbox' id='switch' className='filter-checkbox__true-checkbox' />
      <label htmlFor='switch' className='filter-checkbox__false-checkbox'></label>
      <label htmlFor='switch' className='filter-checkbox__label'>
        {label}
      </label>
    </div>
  );
}
export default FilterCheckbox;
