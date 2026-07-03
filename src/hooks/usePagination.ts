import { useState, useMemo } from 'react';
import { ITEMS_PER_PAGE } from '../utils/constants';

export const usePagination = <T>(
  data: T[],
  initialItemsPerPage: number = ITEMS_PER_PAGE,
) => {
  const [rawPage, setRawPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Clamp the current page to a valid range during render (no effect needed)
  const currentPage = Math.min(rawPage, Math.max(1, totalPages));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    setRawPage(Math.min(Math.max(1, page), totalPages));
  };

  const changeItemsPerPage = (size: number) => {
    setItemsPerPage(size);
    setRawPage(1);
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
};
