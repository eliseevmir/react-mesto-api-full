class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, noIsLiked) {
    return noIsLiked
      ? fetch(`${this._baseUrl}cards/${cardId}/likes`, {
          method: "PUT",
          headers: this._headers,
        }).then(this._checkResponse)
      : fetch(`${this._baseUrl}cards/${cardId}/likes`, {
          method: "DELETE",
          headers: this._headers,
        }).then(this._checkResponse);
  }

  changeAvatarProfile(urlAvatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: urlAvatar,
      }),
    }).then(this._checkResponse);
  }

  editDataProfile(name, about) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  cardsPage(name, link) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "5129c1ae-33e1-40e7-9179-9f9bc64e6a51",
    "Content-Type": "application/json",
  },
});
