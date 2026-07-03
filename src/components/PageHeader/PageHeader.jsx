import { Plus, Pencil, X } from 'lucide-react';
import styles from './PageHeader.module.css';

function PageHeader({
  title,
  onCreate,
  onEdit,
  onDelete,
  isEditDisabled = true,
  isDeleteDisabled = true,
}) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.actionBtn} ${styles.create}`}
          onClick={onCreate}
          title="Create"
        >
          <Plus size={25} />
        </button>

        <button
          type="button"
          className={`${styles.actionBtn} ${styles.edit}`}
          onClick={onEdit}
          disabled={isEditDisabled}
          title="Edit selected"
        >
          <Pencil size={25} />
        </button>

        <button
          type="button"
          className={`${styles.actionBtn} ${styles.delete}`}
          onClick={onDelete}
          disabled={isDeleteDisabled}
          title="Delete selected"
        >
          <X size={25} />
        </button>
      </div>
    </header>
  );
}

export default PageHeader;
