import { Link } from '@tanstack/react-router';
import { FileText, Store, Users } from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
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
