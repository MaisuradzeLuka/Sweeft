import { ChangeEvent } from "react";
import { IoMdSearch } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

interface INavbar {
  inputValue: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Navbar = ({ inputValue, changeHandler }: INavbar) => {
  const { pathname } = useLocation();

  return (
    <nav className="navBar">
      <div className="navBar__leftSide">
        <Link to="/">
          <h1>VisualVoyage</h1>
        </Link>
        {pathname === "/" && (
          <div className="navBar__leftSide__inputWrapper">
            <IoMdSearch />
            <input
              type="text"
              name="ძებნა"
              id="search"
              placeholder="ძებნა..."
              value={inputValue}
              onChange={changeHandler}
            />
          </div>
        )}
      </div>
      <div className="navBar__rightSide">
        {pathname === "/" ? (
          <Link to="/history">History</Link>
        ) : (
          <Link to="/">Home</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
