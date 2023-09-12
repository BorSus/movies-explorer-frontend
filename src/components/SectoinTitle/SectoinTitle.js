import React from 'react';
function SectoinTitle({ text, id }) {
  return (
    <h2 className='sectoin-title' id={id}>
      {text}
    </h2>
  );
}
export default SectoinTitle;
