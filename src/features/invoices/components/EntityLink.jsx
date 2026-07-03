import { useNavigate } from '@tanstack/react-router';
import styles from './EntityLink.module.css';

const EntityLink = ({ to, highlight, children }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate({ to, search: { highlight: String(highlight) } });
  };

  return (
    <button type="button" className={styles.link} onClick={handleClick}>
      {children}
    </button>
  );
};

export default EntityLink;
