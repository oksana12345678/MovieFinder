import { HiArrowLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import css from "./BackLink.module.css";

const BackLink = ({ to, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };
  return (
    <Link className={css.back} to={to} onClick={handleClick}>
      <HiArrowLeft className={css.icon} size="24" />
      {children}
    </Link>
  );
};
export default BackLink;
