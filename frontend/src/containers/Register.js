import { Link } from "react-router-dom";
import Header from "../components/Header";
import AuthForm from "../components/AuthForm";

import Button from "../components/Button";
import TitleForm from "../components/TitleForm";
import QuestionForm from "../components/QuestionForm";

function Register({ handleChange, inputValue, registerRequest }) {
  function handleSubmit(e) {
    e.preventDefault();
    registerRequest(inputValue);
  }

  return (
    <>
      <Header>
        <Link className="header__button" to="/sign-in">
          Войти
        </Link>
      </Header>
      <AuthForm
        handleChange={handleChange}
        state={inputValue}
        handleSubmit={handleSubmit}
      >
        <TitleForm className="data__title">Регистрация</TitleForm>
        <Button className="data__button">Зарегистрироваться</Button>
        <QuestionForm />
      </AuthForm>
    </>
  );
}

export default Register;
