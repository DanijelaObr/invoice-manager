import { createRootRoute, Outlet } from '@tanstack/react-router';
import AppLayout from '../layout/AppLayout/AppLayout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
