import styles from './FormField.module.css';

const FormField = ({ label, labelExtra, error, children, htmlFor }) => {
  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
        {labelExtra}
      </div>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default FormField;
