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
      // Kada se otvori "/", preusmjeri na "/invoices"
      { index: true, element: <Navigate to="/invoices" replace /> },

      { path: 'invoices', element: <InvoicesPage /> },
      // Edit preko URL-a: "/invoices/1" otvara istu stranicu, ali sa id-em
      { path: 'invoices/:id', element: <InvoicesPage /> },

      { path: 'sellers', element: <SellersPage /> },
      { path: 'sellers/:id', element: <SellersPage /> },

      { path: 'customers', element: <CustomersPage /> },
      { path: 'customers/:id', element: <CustomersPage /> },

      // Bilo koji nepostojeći URL → nazad na invoices
      { path: '*', element: <Navigate to="/invoices" replace /> },
    ],
  },
]);
