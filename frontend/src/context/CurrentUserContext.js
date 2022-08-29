import React from "react";

export const defaultUserState = {
  name: "",
  about: "",
  avatar: "",
  loggedIn: false,
  email: "",
};

export const CurrentUserContext = React.createContext(defaultUserState);
