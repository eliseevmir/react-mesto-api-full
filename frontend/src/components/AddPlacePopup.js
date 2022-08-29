import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddNewCardPage }) {
  const [titleCard, setTitleCard] = useState("");
  const [linkCard, setLinkCard] = useState("");

  useEffect(() => {
    setLinkCard("");
    setTitleCard("");
  }, [isOpen, onClose]);

  function handleChangeTitle(e) {
    setTitleCard(e.target.value);
  }

  function handleChangeLink(e) {
    setLinkCard(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddNewCardPage(titleCard, linkCard);

    onClose();
  }

  return (
    <PopupWithForm
      name="cards-add"
      title="Новое место"
      buttonName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={titleCard}
        onChange={handleChangeTitle}
        type="text"
        name="title-card"
        placeholder="Название"
        className="popup__input"
        id="input-card"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error input-card-error"></span>
      <input
        value={linkCard}
        onChange={handleChangeLink}
        type="url"
        name="link-card"
        placeholder="Ссылка на картинку"
        className="popup__input"
        id="input-link"
        required
      />
      <span className="popup__error input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
