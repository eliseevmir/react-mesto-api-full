import { useHistory, Route, Redirect } from "react-router-dom";
import { useCallback, useEffect, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import * as auth from "../utils/auth";

function ProtectedRoute({ component: Component, ...props }) {
  const { state, dispatch } = useContext(CurrentUserContext);
  const { loggedIn } = state;
  const history = useHistory();

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          dispatch({
            type: "setUser",
            payload: {
              loggedIn: true,
              email: res.data.email,
            },
          });
          history.push("/");
        })
        .catch((res) => console.log(res));
    }
  }, [dispatch, history]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  return (
    <Route>
      {() => (loggedIn ? <Component {...props} /> : <Redirect to="/sign-up" />)}
    </Route>
  );
}

export default ProtectedRoute;
