import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleteBascet({ isOpen, onClose, onSubmitHandler }) {

    function onSubmit(event) {
        event.preventDefault()
        onSubmitHandler()
      }
    

    return (

        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmitHandler={onSubmit}
            popupMain="delete"
            name="popupDeleteBascet"
            title="Вы уверенны?"
            text="Да!"
            nameFormContainer = "conteinerDeleteBasket"
        >
        </PopupWithForm>



    );
}


export default PopupDeleteBascet