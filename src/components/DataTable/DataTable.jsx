import { motion, AnimatePresence } from "framer-motion";
import styles from "./DataTable.module.css";

function DataTable({
  columns,
  data,
  isSelected,
  onRowClick,
  currentPage,
  emptyMessage = "No data.",
}) {
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
                {columns.map((col) => (
                  <td key={col.key} className={styles.td}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
