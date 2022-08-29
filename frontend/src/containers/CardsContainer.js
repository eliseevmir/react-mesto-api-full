import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import PopupWithForm from "../components/PopupWithForm";
import ImagePopup from "../components/ImagePopup";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import { api } from "../utils/api";
import { useHistory } from "react-router-dom";

const CardsContainer = () => {
  const { state, dispatch } = useContext(CurrentUserContext);
  const { loggedIn } = state;
  const [cardsPage, setCardsPage] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then((res) => {
          const [userData, cardsPage] = res;
          dispatch({
            type: "setUser",
            payload: userData,
          });
          setCardsPage([...cardsPage]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ ...card });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editDataProfile(name, about)
      .then((res) => {
        dispatch({
          type: "setUser",
          payload: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatarProfile(avatar)
      .then((res) => {
        dispatch({
          type: "setUser",
          payload: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card, isLiked) {
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log();
        setCardsPage((oldCardsPage) => {
          return oldCardsPage.map((item) =>
            item._id === card._id ? newCard : item
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCardsPage((cards) => cards.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .cardsPage(name, link)
      .then((card) => {
        setCardsPage([card, ...cardsPage]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignOutClick() {
    dispatch({
      type: "signOut",
    });
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <>
      <Header>
        <button className="header__button" onClick={handleSignOutClick}>
          Выход
        </button>
      </Header>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        cardsPage={cardsPage}
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}
      />
      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddNewCardPage={handleAddPlaceSubmit}
      />

      <PopupWithForm name="delete-card" title="Вы уверены?" buttonName="Да" />
    </>
  );
};

export default CardsContainer;
