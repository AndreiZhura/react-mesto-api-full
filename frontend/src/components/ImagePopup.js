import React from "react";


function ImagePopup(props) {

  return (
    <div className={props.card.link ? `popup popup_photo popupPhoto popup_opened`:`popup popup_photo popupPhoto`}>
      <div className="popup__main-image" onSubmit={props.onSubmitHandler} >
        <img className="popup__img" src={props.card.link} alt={props.card.name}  />
        <button className="popup__button" id="photoPopupButtonClose" onClick={props.onClose}></button>
        <h3 className="popup__text">{props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
