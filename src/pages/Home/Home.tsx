import { Link } from "react-router";
import { paths } from "../../routes";
import { homeContent } from "./Home.content";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <h1 id="home-hero-title" className={styles.title}>
        {homeContent.hero.title}
      </h1>
      <p className={styles.description}>{homeContent.hero.description}</p>
      <div className={styles.actions}>
        <Link to={paths.projects} className={styles.primary}>
          {homeContent.hero.projectsCta}
        </Link>
        <Link to={paths.contact} className={styles.secondary}>
          {homeContent.hero.contactCta}
        </Link>
      </div>
    </section>
  );
};
