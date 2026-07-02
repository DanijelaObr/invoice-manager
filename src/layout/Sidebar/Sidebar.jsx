import { NavLink } from "react-router-dom";
import { FileText, Store, Users } from "lucide-react";
import styles from "./Sidebar.module.css";

const navItems = [
  { to: "/invoices", label: "Invoices", Icon: FileText },
  { to: "/sellers", label: "Sellers", Icon: Store },
  { to: "/customers", label: "Customers", Icon: Users },
];

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
            title={label}
          >
            <Icon className={styles.icon} size={22} />
            <span className={styles.label}>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
