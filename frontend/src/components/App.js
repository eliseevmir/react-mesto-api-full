import { useState, useReducer } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import CardsContainer from "../containers/CardsContainer";
import Login from "../containers/Login";
import Register from "../containers/Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "../components/InfoTooltip";

import PopupImageOk from "../image/Union__ok.svg";
import PopupImageError from "../image/Union__error.svg";

import {
  CurrentUserContext,
  defaultUserState,
} from "../context/CurrentUserContext";
import reducer from "../context/reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, defaultUserState);

  const [inputValue, setInputValue] = useState({
    password: "",
    email: "",
  });

  const [popupStatus, setPopupStatus] = useState({
    popupVisible: false,
    popupImage: "",
    popupText: "",
  });
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  }

  function registerRequest({ password, email }) {
    auth
      .register(password, email)
      .then((res) => {
        if (res.data) {
          setInputValue({ password: "", email: "" });
          popupStatusVisible(
            true,
            PopupImageOk,
            "Вы успешно зарегистрировались!"
          );
          history.push("/sign-in");
        }
      })
      .catch((res) => {
        popupStatusVisible(true, PopupImageError, res);
      });
  }

  function authorizationRequest({ password, email }) {
    auth
      .authorization(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setInputValue({
            password: "",
            email: "",
          });
          dispatch({
            type: "setLogged",
            payload: true,
          });
          history.push("/");
        }
      })
      .catch((res) => {
        popupStatusVisible(true, PopupImageError, res);
      });
  }

  function popupStatusVisible(status, image, text) {
    setPopupStatus({
      popupVisible: status,
      popupImage: image,
      popupText: text,
    });
  }

  function closePopup() {
    setPopupStatus(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={{ state, dispatch }}>
        <Switch>
          <ProtectedRoute exact path="/" component={CardsContainer} />
          <Route path="/sign-up">
            <Register
              inputValue={inputValue}
              handleChange={handleChange}
              registerRequest={registerRequest}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              inputValue={inputValue}
              handleChange={handleChange}
              authorizationRequest={authorizationRequest}
            />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>

      <InfoTooltip popupStatus={popupStatus} onClose={closePopup} />
    </>
  );
}

export default App;
