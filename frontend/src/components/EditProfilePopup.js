import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { state } = useContext(CurrentUserContext);

  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setUserName(state.name);

    setDescription(state.about);
  }, [state, isOpen]);

  function handleChangeName(e) {
    setUserName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: userName,
      about: description,
    });

    onClose();
  }

  return (
    <PopupWithForm
      name="create-profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={userName || ""}
        onChange={handleChangeName}
        type="text"
        name="user-name"
        placeholder="Имя"
        className="popup__input"
        id="input-name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error input-name-error"></span>
      <input
        value={description || ""}
        onChange={handleChangeDescription}
        type="text"
        name="user-info"
        placeholder="О себе"
        className="popup__input"
        id="input-info"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error input-info-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
