import React from "react";
import pensil from "../images/pencil.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Footer from "./Footer";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardDelete,
  onCardClick,
  onCardLike,
  cards,
}) {
/*Вы подключили дерево компонентов к провайдеру контекста. 
Теперь, чтобы использовать его значение в любом из этих компонентов, нужно «подписать» компонент на контекст.
Благодаря этому компонент будет перерисовываться каждый раз, когда меняется значение контекста.
В функциональных компонентах для этого используют хук React.useContext. 
Этот хук возвращает значение контекста, которое было передано в пропс value провайдера:*/


  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            alt="Аватар"
            className="profile__avatar"
            id="profileAvatar"
            onClick={onEditAvatar}
          />
          <img src={pensil} alt="ручка" className="profile__pencil" />
        </div>

        <div className="profile__info">
          <h1 className="profile__name" id="profileName">
            {currentUser.name}
          </h1>

          <button
            className="profile__button-edit"
            id="popOpenProfile"
            type="button"
            onClick={onEditProfile}
          ></button>

          <p className="profile__profession" id="profileProfession">
            {currentUser.about}
          </p>
        </div>

        <button
          className="profile__button-add"
          type="button"
          id="popOpenElements"
          onClick={onAddPlace}
        ></button>
      </section>
      <div className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardDelete={onCardDelete}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </main>
    <Footer/>
    </>
  );
}

export default Main;
