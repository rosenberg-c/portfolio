import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { navigation, navigationMenuLabel } from "../../content/navigation";
import { paths } from "../../../../routes";
import { ThemeSelector } from "../../../theme/ThemeSelector";
import styles from "./SiteHeader.module.css";

export const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const focusedTheme = useRef<"mobile" | "desktop" | null>(null);
  const mobileTheme = useRef<HTMLSpanElement>(null);
  const desktopTheme = useRef<HTMLSpanElement>(null);
  const breakpoint = useRef<MediaQueryList | null>(null);

  const focusVisibleTheme = (mobile: boolean) => {
    const visible = mobile ? "mobile" : "desktop";
    if (focusedTheme.current !== null && focusedTheme.current !== visible) {
      (mobile ? mobileTheme : desktopTheme).current
        ?.querySelector("select")
        ?.focus();
    }
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 42rem)");
    breakpoint.current = media;
    const onChange = (event: MediaQueryListEvent) =>
      focusVisibleTheme(event.matches);
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      breakpoint.current = null;
    };
  }, []);

  const onThemeBlur = (
    side: "mobile" | "desktop",
    next: EventTarget | null,
  ) => {
    if (
      next === null &&
      breakpoint.current !== null &&
      breakpoint.current.matches !== (side === "mobile")
    ) {
      (side === "mobile" ? desktopTheme : mobileTheme).current
        ?.querySelector("select")
        ?.focus();
    } else {
      focusedTheme.current = null;
    }
  };

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
        <span
          ref={mobileTheme}
          className={styles.mobileTheme}
          onFocus={() => (focusedTheme.current = "mobile")}
          onBlur={(event) => onThemeBlur("mobile", event.relatedTarget)}
        >
          <ThemeSelector id="mobile-theme-preference" />
        </span>
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
        <span
          ref={desktopTheme}
          className={styles.desktopTheme}
          onFocus={() => (focusedTheme.current = "desktop")}
          onBlur={(event) => onThemeBlur("desktop", event.relatedTarget)}
        >
          <ThemeSelector />
        </span>
      </div>
    </header>
  );
};
