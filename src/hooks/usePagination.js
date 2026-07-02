import { useState, useMemo, useEffect } from "react";
import { ITEMS_PER_PAGE } from "../utils/constants";

export function usePagination(data, initialItemsPerPage = ITEMS_PER_PAGE) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const changeItemsPerPage = (size) => {
    setItemsPerPage(size);
    setCurrentPage(1); // vrati na prvu stranicu kad se promijeni veličina
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    itemsPerPage,
    goToPage,
    changeItemsPerPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
  };
}
