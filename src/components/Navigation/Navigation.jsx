import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
const Navigation = () => {
  const activeClass = ({ isActive }) => {
    return clsx(css.home, isActive && css.active);
  };
  return (
    <div className={css.container}>
      <nav className={css.navigation}>
        <NavLink className={activeClass} to="/">
          Home
        </NavLink>
        <NavLink className={activeClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </div>
  );
};
export default Navigation;
