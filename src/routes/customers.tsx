import { createFileRoute } from '@tanstack/react-router';
import CustomersPage from '../features/customers/CustomersPage';

interface CustomersSearch {
  highlight?: string;
}

export const Route = createFileRoute('/customers')({
  component: CustomersPage,
  validateSearch: (search: Record<string, unknown>): CustomersSearch => ({
    highlight: search.highlight ? String(search.highlight) : undefined,
  }),
});
