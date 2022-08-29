import {useContext} from "react";
import Card from "./Card";

import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({ cardsPage, onCardLike, onCardDelete, ...props }) {
  const {state} = useContext(CurrentUserContext);
  const {name, about, avatar} = state
  return (
    <main>
      <section className="profile">
        <div className="profile__item">
          <button
            className="profile__avatar"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${avatar})` }}
          />
          <div className="profile__info">
            <h1 className="profile__title">{name}</h1>
            <button
              className="profile__button-create"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__subtitle">{about}</p>
          </div>
        </div>
        <button
          className="profile__button-add"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="cards">
          {cardsPage.map((card) => (
            <Card
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
