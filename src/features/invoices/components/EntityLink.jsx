import { useNavigate } from 'react-router-dom';
import styles from './EntityLink.module.css';

function EntityLink({ to, children }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation(); // Disable row selection for invoices
    navigate(to);
  };

  return (
    <button type="button" className={styles.link} onClick={handleClick}>
      {children}
    </button>
  );
}

export default EntityLink;
