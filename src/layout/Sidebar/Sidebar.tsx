import { Link } from '@tanstack/react-router';
import { FileText, Store, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import styles from './Sidebar.module.css';

interface NavItem {
  to: string;
  label: string;
  Icon: LucideIcon;
}

const navItems: NavItem[] = [
  { to: '/invoices', label: 'Invoices', Icon: FileText },
  { to: '/sellers', label: 'Sellers', Icon: Store },
  { to: '/customers', label: 'Customers', Icon: Users },
];

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            className={styles.item}
            activeProps={{ className: `${styles.item} ${styles.active}` }}
            title={label}
          >
            <Icon className={styles.icon} size={22} />
            <span className={styles.label}>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
