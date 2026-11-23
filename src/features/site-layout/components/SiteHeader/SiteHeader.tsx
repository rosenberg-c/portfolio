import { useState } from "react";
import { Link, NavLink } from "react-router";
import { navigation, navigationMenuLabel } from "../../content/navigation";
import { paths } from "../../../../routes";
import { ThemeSelector } from "../../../theme/ThemeSelector";
import styles from "./SiteHeader.module.css";

export const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} container`}>
        <Link
          to={paths.home}
          className={styles.brand}
          onClick={() => setIsOpen(false)}
        >
          Portfolio
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={navigationMenuLabel}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
        </button>
        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={styles.nav}
          data-open={isOpen}
        >
          {navigation.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === paths.home}
              onClick={() => setIsOpen(false)}
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
