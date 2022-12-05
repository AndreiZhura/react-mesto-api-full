import React from "react";
import PopupWithForm from "./PopupWithForm";



function PopupWithCard(props) {

  const nameRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [props.isOpen]);

 

  function onSubmit(event) {
     
    event.preventDefault();

    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  

  

    return (

        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmitHandler={onSubmit}
            name="popupElements"
            title="Новое место"
            text="Сохранить"
            nameFormContainer = "conteinerElements"
        >
           <input className="popup__input"
                id="title-input" required
                minLength="2"
                maxLength="30"
                placeholder="Титульник"
                type="text"
                name="name" 
                ref={nameRef}
                />
            <span className="popup__error title-input-error"></span>
            <input className="popup__input"
                id="link-input"
                required
                placeholder="Ссылка на картинку"
                type="url"
                name="link"
                ref = {linkRef} />
            <span className="popup__error link-input-error"> </span>
        </PopupWithForm>



    );
}


export default PopupWithCard