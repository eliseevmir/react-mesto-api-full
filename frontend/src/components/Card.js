import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { state } = useContext(CurrentUserContext);

  const isOwn = state._id === card.owner._id;
  const cardDeleteButtonClassName = `cards__trash ${
    !isOwn ? "cards__trash_hidden" : ""
  }`;

  const isLiked = card.likes.some((like) => like._id === state._id);
  const cardLikeButtonClassName = `cards__like ${
    isLiked ? "cards__like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="cards__item">
      <img
        src={card.link}
        alt={card.name}
        className="cards__image"
        onClick={handleClick}
      />
      <div className="cards__description">
        <h2 className="cards__text">{card.name}</h2>
        <div className="cards__info">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="cards__like-number">{card.likes.length}</span>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}

export default Card;
