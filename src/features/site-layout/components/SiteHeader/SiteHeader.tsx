import { Link, NavLink } from "react-router";
import { navigation } from "../../content/navigation";
import { paths } from "../../../../routes";
import { ThemeSelector } from "../../../theme/ThemeSelector";
import styles from "./SiteHeader.module.css";

export const SiteHeader = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.inner} container`}>
        <Link to={paths.home} className={styles.brand}>
          Portfolio
        </Link>
        <nav aria-label="Primary navigation" className={styles.nav}>
          {navigation.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === paths.home}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <ThemeSelector />
      </div>
    </header>
  );
};
