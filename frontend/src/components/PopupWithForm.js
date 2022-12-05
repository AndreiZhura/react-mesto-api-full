
import React from 'react';

function PopupWithForm({ isOpen, onClose, popupMain, name, onSubmitHandler, title, children, text,nameFormContainer }) {



  return (
    <>
      <section className={isOpen ? `popup ${name} popup_opened` : `popup ${name}`}  >
        <div className={`popup__main popup__main-${popupMain}`}>
          <button className="popup__button" type="button" id="closeButtonProfile" onClick={onClose}></button>
          <form noValidate className="popup__container" id="popupContainerProfile" name={nameFormContainer} onSubmit={onSubmitHandler}>
            <h2 className="popup__title">{title}</h2>
            {children}
            <button className="popup__save " type="submit" id="popupProfileButtonSave">{text}</button>
          </form>
        </div>
      </section>

    </>
  );
}

export default PopupWithForm;

