import { Link } from "react-router";
import { paths } from "../../../../routes";
import { navigation } from "../../content/navigation";
import { siteFooterContent } from "./SiteFooter.content";
import styles from "./SiteFooter.module.css";

export const SiteFooter = () => (
  <footer className={styles.footer}>
    <div className={`${styles.inner} container`}>
      <div className={styles.contact}>
        <h2>{siteFooterContent.title}</h2>
        <p className={styles.invitation}>{siteFooterContent.invitation}</p>
        <p className={styles.notice}>{siteFooterContent.notice}</p>
        <Link className={styles.action} to={paths.contact}>
          {siteFooterContent.action}
        </Link>
      </div>
      <nav aria-label={siteFooterContent.navigationLabel}>
        <ul className={styles.links}>
          {navigation.map(({ to, label }) => (
            <li key={to}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </footer>
);
