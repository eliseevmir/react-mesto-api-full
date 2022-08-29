function InfoTooltip({ popupStatus, onClose }) {
  const { popupVisible, popupImage, popupText } = popupStatus;
  const className = `popup ${popupVisible ? "popup_opened" : ""}`;

  return (
    <div>
      <div className={className}>
        <div className="popup__info">
          <img
            src={popupImage}
            alt="Статус регистрации"
            className="popup__status"
          ></img>
          <p className="popup__text">{popupText}</p>
          <button className="popup__close" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
