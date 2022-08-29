function ImagePopup({card, onClose}) {
const className = `popup popup_image ${card ? "popup_opened" : ""}`
  return (
    
    <div className={className}>
      <div className="popup__image">
        <img src={card?.link || "#"} alt={card?.name || "#"}  className="popup__image-scale" />
        <p className="popup__image-text">{card?.name || "#"}</p>
        <button className="popup__close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
