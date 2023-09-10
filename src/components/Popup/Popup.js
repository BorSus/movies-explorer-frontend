import React from 'react';
import closeIcon from '../../images/close-popup-icon.svg';
function Popup({ children, isOpenPopup, onCloseClick }) {
  return (
    <div className={`popup ${isOpenPopup && `popup_opened`}`}>
      <img src={closeIcon} alt='close popup' onClick={onCloseClick} className='popup__close' />
      <div className='popup__container'>{children}</div>
    </div>
  );
}
export default Popup;
