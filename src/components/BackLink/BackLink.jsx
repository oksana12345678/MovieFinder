import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import css from "./BackLink.module.css";

const BackLink = ({ to, children }) => {
  return (
    <Link className={css.back} to={to}>
      <HiArrowLeft className={css.icon} size="24" />
      {children}
    </Link>
  );
};
export default BackLink;
