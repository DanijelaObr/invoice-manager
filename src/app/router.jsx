import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layout/AppLayout/AppLayout';
import InvoicesPage from '../features/invoices/InvoicesPage';
import SellersPage from '../features/sellers/SellersPage';
import CustomersPage from '../features/customers/CustomersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // When the user opens "/", redirect to "/invoices"
      { index: true, element: <Navigate to="/invoices" replace /> },

      { path: 'invoices', element: <InvoicesPage /> },

      // Editing via URL: "/invoices/1" opens the same page with the invoice ID
      { path: 'invoices/:id', element: <InvoicesPage /> },

      { path: 'sellers', element: <SellersPage /> },
      { path: 'sellers/:id', element: <SellersPage /> },

      { path: 'customers', element: <CustomersPage /> },
      { path: 'customers/:id', element: <CustomersPage /> },

      // Any non-existent URL → redirect back to invoices
      { path: '*', element: <Navigate to="/invoices" replace /> },
    ],
  },
]);
