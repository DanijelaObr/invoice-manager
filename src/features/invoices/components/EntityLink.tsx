import { useNavigate } from '@tanstack/react-router';
import type { ReactNode, MouseEvent } from 'react';
import styles from './EntityLink.module.css';

interface EntityLinkProps {
  to: string;
  highlight: string;
  children: ReactNode;
}

const EntityLink = ({ to, highlight, children }: EntityLinkProps) => {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
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
