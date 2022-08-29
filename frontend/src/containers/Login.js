import { Link } from "react-router-dom";
import Header from "../components/Header";
import AuthForm from "../components/AuthForm";
import Button from "../components/Button";
import TitleForm from "../components/TitleForm";

function Login({ inputValue, handleChange, authorizationRequest }) {
  function handleSubmit(e) {
    e.preventDefault();
    authorizationRequest(inputValue);
  }

  return (
    <>
      <Header>
        <Link className="header__button" to="/sign-up">
          Зарегистрироваться
        </Link>
      </Header>
      <AuthForm
        state={inputValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      >
        <TitleForm className="data__title">Вход</TitleForm>
        <Button className="data__button">Войти</Button>
      </AuthForm>
    </>
  );
}

export default Login;
