import css from "./NextPage.module.css";

const NextPage = ({ onChang }) => {
  return (
    <div className={css.container}>
      <button className={css.button} onClick={onChang} type="button">
        Next page
      </button>
    </div>
  );
};
export default NextPage;
