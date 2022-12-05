import React from "react";
import PopupWithForm from "./PopupWithForm";

/*Для функциональных компонентов существует специальный хук useRef.
Он возвращает объект, который с помощью JSX-атрибута ref можно присвоить любому элементу, чтобы получить доступ к нему.
Этот объект содержит одно единственное поле current. 
Именно в это поле React запишет указатель на DOM-элемент, когда будет формировать DOM-дерево.*/

function PopupWithAvatar(props) {

  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";// записываем объект, возвращаемый хуком, в переменную
  }, [props.isOpen]);



  function onSubmit(event) {

    event.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,// вызываем нужный метод на поле current объекта
    });
  }


  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmitHandler={onSubmit}
      name="popupAvatars"
      popupMain="avatars"
      title="Обновить Аватарку"
      text="Сохранить"
      nameFormContainer = "conteinerAvatars"
    >
      <input
        className="popup__input"
        id="avatar-input"
        required
        placeholder="Ссылка на картинку"
        type="url"
        name="avatar-link"
        ref={avatarRef}
      />
      <span className="popup__error avatar-input-error"> </span>
    </PopupWithForm>
  );
}

export default PopupWithAvatar;
