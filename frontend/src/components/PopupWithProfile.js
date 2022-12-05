import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function PopupWithProfile(props) {

// Стейт, в котором содержится значение инпута
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  // Обработчик изменения инпута обновляет стейт
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name : name,
      about: description,
    });
  }
 // Значение элемента «привязывается» к значению стейта
  return (

    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmitHandler={handleSubmit}
      name="popupProfile"
      title="Редактировать профиль"
      text="Сохранить"
      nameFormContainer = "conteinerProfile"
    >

      <input
        className="popup__input"
        id="name-input"
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        type="text"
        name="nameProfile"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__error name-input-error">Ошибка</span>
      <input
        className="popup__input"
        id="job-input"
        required
        minLength="2"
        maxLength="200"
        placeholder="профеcсия"
        type="text"
        name="professionProfile"
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="popup__error job-input-error"></span>

    </PopupWithForm>



  );
}


export default PopupWithProfile