import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { ChangeEvent } from "react";

interface INavbar {
  inputValue: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Navbar = ({ inputValue, changeHandler }: INavbar) => {
  const { pathname } = useLocation();

  return (
    <nav className="navBar">
      {pathname === "/" ? (
        <Link to="/history">History</Link>
      ) : (
        <Link to="/">Home</Link>
      )}
      {pathname === "/" && (
        <input
          type="text"
          name="ძებნა"
          id="search"
          placeholder="ძებნა..."
          value={inputValue}
          onChange={changeHandler}
        />
      )}
    </nav>
  );
};

export default Navbar;
