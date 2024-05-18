import css from "./Loader.module.css";
import HashLoader from "react-spinners/HashLoader";
const Loader = () => {
  return (
    <div className={css.container}>
      <HashLoader className={css.loader} />
    </div>
  );
};
export default Loader;
