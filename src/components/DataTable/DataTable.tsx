import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './DataTable.module.css';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isSelected: (id: string) => boolean;
  onRowClick: (id: string) => void;
  currentPage: number;
  emptyMessage?: string;
}

const DataTable = <T extends { id: string }>({
  columns,
  data,
  isSelected,
  onRowClick,
  currentPage,
  emptyMessage = 'No data.',
}: DataTableProps<T>) => {
  if (data.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={styles.th}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody key={currentPage}>
          <AnimatePresence mode="popLayout" initial={false}>
            {data.map((row) => (
              <motion.tr
                key={`${currentPage}-${row.id}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={
                  isSelected(row.id)
                    ? `${styles.row} ${styles.selected}`
                    : styles.row
                }
                onClick={() => onRowClick(row.id)}
              >
                {columns.map((col) => {
                  const content = col.render
                    ? col.render(row)
                    : String(row[col.key as keyof T]);
                  // title only for plain text cells (not for custom-rendered React elements)
                  const title = col.render
                    ? undefined
                    : String(row[col.key as keyof T]);
                  return (
                    <td key={col.key} className={styles.td} title={title}>
                      {content}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
