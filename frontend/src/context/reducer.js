import { defaultUserState } from "./CurrentUserContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "setAvatar": {
      return {
        ...state,
        avatar: action.payload,
      };
    }
    case "setUser": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "setLogged": {
      return {
        ...state,
        loggedIn: action.payload,
      };
    }
    case "signOut": {
      return {
        ...defaultUserState,
      };
    }

    default:
      return state;
  }
};

export default reducer;
