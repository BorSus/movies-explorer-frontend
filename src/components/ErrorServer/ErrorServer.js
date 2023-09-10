import React from 'react';
function ErrorServer({ message, isErrorServerOpen, handleCloseErrorServer }) {
  return (
    <div className={`error-server  ${isErrorServerOpen && `error-server_open`}`}>
      <p className='error-server__message'>{message}</p>
      <button className='error-server__close' onClick={handleCloseErrorServer}>
        OK
      </button>
    </div>
  );
}
export default ErrorServer;
