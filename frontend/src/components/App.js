import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import PopupWithProfile from "./PopupWithProfile";
import PopupWithCard from "./PopupWithCard";
import PopupWithAvatar from "./PopupWithAvatar";
import api from "../utils/Api";
import PopupDeleteBascet from "./PopupDeleteBascet";
import ImagePopup from "./ImagePopup";
// 11 спринт
import CurrentUserContext from "../contexts/CurrentUserContext";
// 12 спринт
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/auth";
import { useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setEditPlacePopupOpen] = useState(false);
  const [isAddAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddDeletePopupOpen, setEditDeletePopupOpen] = useState(null);
  const [selectedCard, setEditCardPopupOpen] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setloggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [infoPopup, setInfoPopup] = useState(false);
  const [isOpenInfoPopup, setisOpenInfoPopup] = useState(false);
  const [headerIsOpen, setHeaderIsOpen] = useState(false);
  // проверяем авторизован пользователь или нет
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const history = useHistory();

  // теперь карточки и вся информация о юзере загружаются если  isLoggedIn === true
  useEffect(() => {
    if (!isLoggedIn) return;
      api
        .downLoadingUserInformationFromServer()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.error(err);
        });

      api
        .downloadingCardsFromServer()
        .then((result) => {
          setCards(result);
        })
        .catch((err) => {
          console.error(err);
        });
    
  }, [isLoggedIn]);

  function handleCardDelete() {
    const cardID = isAddDeletePopupOpen._id;

    /*JavaScript метод .filter() позволяет создать новый массив, элементы которого соответствуют условию заданному в пререданной функции 
    (для которых функция возвращает true). Элементы массива, которые не соответствуют условию в переданной функции (для которых функция возвращает false)
     пропускаются и не включаются в новый массив отфильтрованных элементов.
    */
    api
      .popupDeleteCard(cardID)
      .then((newCard) => {
        setCards((state) => state.filter((card) => card._id !== cardID));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser(User) {
    /*Редактирование профиля
      Отредактированные данные профиля должны сохраняться на сервере.  */
    api
      .editingProfile(User)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateUseravatar(avatar.avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
        document.getElementById("root");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  ///////////////////////////////////////////////////////////

  function handleCardClick(card) {
    setEditCardPopupOpen(card);
  }

  function handleDeleteCard(card) {
    setEditDeletePopupOpen(card);
  }

  function openProfile() {
    setEditProfilePopupOpen(true);
  }

  function openEditCards() {
    setEditPlacePopupOpen(true);
  }

  function openAvatar() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditDeletePopupOpen(null);
    setEditCardPopupOpen({});
    setisOpenInfoPopup(false);
    setHeaderIsOpen(false);
  }

  //////////////////////////////////////////////////////////////////////////////
  /*Компонент Provider имеет пропс value со значением, которое нужно
  распространить всем дочерним элементам.*/

  /*Компонент Route устанавливает связь между путём, который указан в пропсе path, и URL-адресом, который в данный момент используется браузером. 
  При каждом обращении к этому URL будет отображаться компонент внутри маршрута. */

  /*Если разместить несколько компонентов Route внутри Switch, отрисуется только один из них.*/

  // 12 спринт

  function headerOpen() {
    setHeaderIsOpen(true);
  }

  const newAuth = (jwt) => {
    return auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setisLoggedIn(true);
          setloggedIn(true);
          setUserEmail(res.data.email);
          setUserData({
            username: res.username,
            email: res.email,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      newAuth(jwt);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        setisLoggedIn(true);
        setloggedIn(true);
        setUserEmail(email);
        history.push("/");
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          setInfoPopup(true);
          setisOpenInfoPopup(true);

          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoPopup(false);
        setisOpenInfoPopup(true);
      });
  }

  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/sign-up');
    setisLoggedIn(false)
  }


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          headerIsOpen={headerIsOpen}
          headerOpen={headerOpen}
          loggedIn={loggedIn}
          userEmail={userEmail}
          onClose={closeAllPopups}
          signOut = {signOut}
        />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={openProfile}
            onEditAvatar={openAvatar}
            onAddPlace={openEditCards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
            cards={cards}
          />

          <Route path="/sign-up">
            <Register handleRegistration={handleRegistration} />
            <InfoTooltip
              infoPopup={infoPopup}
              isOpenInfoPopup={isOpenInfoPopup}
              onClose={closeAllPopups}
            />
          </Route>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
            <InfoTooltip
              infoPopup={infoPopup}
              isOpenInfoPopup={isOpenInfoPopup}
              onClose={closeAllPopups}
            />
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
          </Route>
        </Switch>

        <PopupWithProfile
          loggedIn={loggedIn}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupWithCard
          loggedIn={loggedIn}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithAvatar
          loggedIn={loggedIn}
          isOpen={isAddAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupDeleteBascet
          loggedIn={loggedIn}
          isOpen={isAddDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitHandler={handleCardDelete}
        />
        <ImagePopup
          loggedIn={loggedIn}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
