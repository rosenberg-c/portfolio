import { Link } from "react-router";
import { aboutContent } from "../About/About.content";
import { paths } from "../../routes";
import { homeContent } from "./Home.content";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <>
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
      <section className={styles.about} aria-labelledby="home-about-title">
        <div className={styles.aboutVisual} aria-hidden="true" />
        <div className={styles.aboutContent}>
          <h2 id="home-about-title">{aboutContent.title}</h2>
          <p>{aboutContent.bio}</p>
          <div className={styles.aboutDetails}>
            <div>
              <h3>{aboutContent.skillsHeading}</h3>
              <ul className={styles.skills}>
                {aboutContent.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{aboutContent.educationHeading}</h3>
              <p>{aboutContent.school}</p>
              <p>{aboutContent.dates}</p>
            </div>
          </div>
          <Link to={paths.about} className={styles.secondary}>
            {homeContent.about.cta}
          </Link>
        </div>
      </section>
    </>
  );
};
