import type { ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './AppLayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default AppLayout;
