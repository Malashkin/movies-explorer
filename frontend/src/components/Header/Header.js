import headerLogo from "./../../images/header_logo.svg";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header({ loggedIn }) {
  const headerClassName = `header ${
    loggedIn ? "header_withuser" : "header_nouser"
  }`;

  return (
    <div className={headerClassName}>
      <Link to="/">
        <img className="header_logo" src={headerLogo} alt="Логотип" />
      </Link>
      <Navigation loggedIn={loggedIn} />
    </div>
  );
}

export default Header;
