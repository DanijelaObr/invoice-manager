import { createFileRoute } from '@tanstack/react-router';
import SellersPage from '../features/sellers/SellersPage';

export const Route = createFileRoute('/sellers')({
  component: SellersPage,
  validateSearch: (search) => ({
    highlight: search.highlight ? String(search.highlight) : undefined,
  }),
});
