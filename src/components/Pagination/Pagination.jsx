import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Paginacija">
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Prethodna stranica"
          >
            <ChevronLeft size={18} />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={
                page === currentPage
                  ? `${styles.pageBtn} ${styles.active}`
                  : styles.pageBtn
              }
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className={styles.navBtn}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Sljedeća stranica"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      )}

      {onItemsPerPageChange && (
        <select
          className={styles.pageSize}
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          aria-label="Broj redova po stranici"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default Pagination;
