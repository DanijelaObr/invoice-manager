import styles from './Spinner.module.css';

interface SpinnerProps {
  label?: string;
}

const Spinner = ({ label = 'Loading...' }: SpinnerProps) => {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default Spinner;
