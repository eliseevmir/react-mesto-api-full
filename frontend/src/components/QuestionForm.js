import { Link } from "react-router-dom";

function QuestionForm() {
  return (
    <div className="data__auth">
      <span className="data__question">
        Уже зарегистрированы?
        <Link to="/sign-in" className="data__link">
          Войти
        </Link>
      </span>
    </div>
  );
}

export default QuestionForm;
