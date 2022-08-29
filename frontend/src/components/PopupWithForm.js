function PopupWithForm(props) {
  const className = `popup popup_${props.name} ${
    props.isOpen ? "popup_opened" : ""
  }`;

  return (
    <div className={className}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          action="#"
          name={props.name}
          className="popup__form popup__form-profile"
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}

          <button className="popup__button" type="submit">
            {props.buttonName}
          </button>
        </form>
        <button className="popup__close" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
