import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const refUrl = useRef();

  useEffect(() => {
    refUrl.current.value = "";
  }, [isOpen, onClose]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: refUrl.current.value,
    });
    onClose();
  }

  return (
    <PopupWithForm
      name="create-avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={refUrl}
        type="url"
        name="avatar-info"
        placeholder="Введите адрес изображения"
        className="popup__input"
        id="avatar-info"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error avatar-info-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
