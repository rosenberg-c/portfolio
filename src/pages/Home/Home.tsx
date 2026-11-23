import { Link } from "react-router";
import { aboutContent } from "../About/About.content";
import { projectsContent } from "../Projects/Projects.content";
import projectStyles from "../Projects/Projects.module.css";
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
      <section
        className={styles.projects}
        aria-labelledby="home-projects-title"
      >
        <div className={styles.projectsHeading}>
          <h2 id="home-projects-title">{projectsContent.title}</h2>
          <Link to={paths.projects} className={styles.secondary}>
            {homeContent.projects.cta}
          </Link>
        </div>
        <ul className={projectStyles.grid}>
          {projectsContent.projects.slice(0, 2).map((project) => (
            <li key={project.id} className={projectStyles.card}>
              <article>
                <div className={projectStyles.visual} aria-hidden="true" />
                <div className={projectStyles.cardBody}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul
                    className={projectStyles.stack}
                    aria-label={projectsContent.stackLabel}
                  >
                    {project.stack.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
