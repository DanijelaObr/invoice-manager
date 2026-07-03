import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './Toast.module.css';
import type { Toast } from '.../../../types';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className={styles.container}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          <span className={styles.message}>{toast.message}</span>
          <button
            type="button"
            className={styles.close}
            onClick={() => onRemove(toast.id)}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>,
    document.body,
  );
};

export default ToastContainer;
