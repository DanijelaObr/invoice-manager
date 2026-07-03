import { createFileRoute } from '@tanstack/react-router';
import SellersPage from '../features/sellers/SellersPage';

export const Route = createFileRoute('/sellers/$id')({
  component: SellersPage,
});
