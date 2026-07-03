import { createFileRoute } from '@tanstack/react-router';
import SellersPage from '../features/sellers/SellersPage';

interface SellersSearch {
  highlight?: string;
}

export const Route = createFileRoute('/sellers')({
  component: SellersPage,
  validateSearch: (search: Record<string, unknown>): SellersSearch => ({
    highlight: search.highlight ? String(search.highlight) : undefined,
  }),
});
