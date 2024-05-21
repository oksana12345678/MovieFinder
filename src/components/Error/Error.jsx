import css from "./Error.module.css";
import Alert from "@mui/material/Alert";

const Error = () => {
  return (
    <Alert className={css.error} variant="filled" severity="error">
      Sorry, something went wrong!
    </Alert>
  );
};
export default Error;
