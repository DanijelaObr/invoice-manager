import { useState } from 'react';

export function useRowSelection() {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelection = (id) => {
    setSelectedIds((prev) => {
      const strId = String(id);
      const exists = prev.some((x) => String(x) === strId);
      if (exists) {
        return prev.filter((x) => String(x) !== strId);
      }
      return [...prev, id];
    });
  };

  const selectRow = (id) => {
    setSelectedIds([id]); // Always select only that row
  };

  const clearSelection = () => setSelectedIds([]);

  const isSelected = (id) => selectedIds.some((x) => String(x) === String(id));

  return {
    selectedIds,
    toggleSelection,
    selectRow,
    clearSelection,
    isSelected,
    selectedCount: selectedIds.length,
    singleSelectedId: selectedIds.length === 1 ? selectedIds[0] : null,
  };
}
