import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
const Navigation = () => {
  return (
    <div className={css.container}>
      <nav className={css.navigation}>
        <NavLink className={css.home} to="/">
          {" "}
          Home
        </NavLink>
        <NavLink className={css.movie} to="/movie">
          Movie
        </NavLink>
      </nav>
    </div>
  );
};
export default Navigation;
