import Modal from "../Modal/Modal";
import styles from "./ConfirmDialog.module.css";

function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  isProcessing = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} width="420px" hideHeader>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={onConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
