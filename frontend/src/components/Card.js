import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__basket ${
    isOwn ? "element__basket_visible" : "element__basket_hidden"
  }`;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) =>  i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active_black" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);

  }
 

 function handleCardDelete() {
  onCardDelete(card);
  }

  return (
    <article className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__rectangle"
        onClick={handleClick}
      />

      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleCardDelete}
      />

      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
            type="button"
          ></button>
          <span className="element__number">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
