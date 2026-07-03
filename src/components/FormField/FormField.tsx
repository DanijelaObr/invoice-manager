import type { ReactNode } from 'react';
import styles from './FormField.module.css';

interface FormFieldProps {
  label: string;
  labelExtra?: ReactNode;
  error?: string;
  children: ReactNode;
  htmlFor?: string;
}

const FormField = ({
  label,
  labelExtra,
  error,
  children,
  htmlFor,
}: FormFieldProps) => {
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
