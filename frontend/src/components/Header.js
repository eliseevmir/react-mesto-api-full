import logo from "../image/logo.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Header(props) {
  const { children } = props;
  const { state } = useContext(CurrentUserContext);
  const { email } = state;

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__data">
        <span className="header__email">{email}</span>
        {children}
      </div>
    </header>
  );
}

export default Header;
