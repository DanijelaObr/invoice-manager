import { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from './ToastContainer';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = 'info') => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      // Automatically dismiss after 3.5 seconds
      setTimeout(() => removeToast(id), 3500);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// Custom hook for use in any component
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast mora biti unutar ToastProvider-a');
  }
  return context;
}
