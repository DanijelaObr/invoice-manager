import { useNavigate } from "react-router-dom";
import styles from "./EntityLink.module.css";

function EntityLink({ to, children }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation(); // spriječi selekciju reda fakture
    navigate(to);
  };

  return (
    <button type="button" className={styles.link} onClick={handleClick}>
      {children}
    </button>
  );
}

export default EntityLink;
