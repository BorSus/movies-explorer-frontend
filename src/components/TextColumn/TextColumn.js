import React from 'react';
function TextColumn({ title, text }) {
  return (
    <div className='text-column'>
      <p className='text-column__title'>{title}</p>
      <p className='text-column__text'>{text}</p>
    </div>
  );
}
export default TextColumn;
