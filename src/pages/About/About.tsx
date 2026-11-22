import { aboutContent } from "./About.content";
import styles from "./About.module.css";

export const About = () => {
  return (
    <article className={styles.page} aria-labelledby="about-title">
      <h1 id="about-title" className={styles.title}>
        {aboutContent.title}
      </h1>
      <div className={styles.intro}>
        <div className={styles.visual} aria-hidden="true" />
        <section className={styles.bio} aria-labelledby="about-bio-title">
          <h2 id="about-bio-title">{aboutContent.bioHeading}</h2>
          <p>{aboutContent.bio}</p>
        </section>
      </div>
      <div className={styles.details}>
        <section aria-labelledby="about-skills-title">
          <h2 id="about-skills-title">{aboutContent.skillsHeading}</h2>
          <ul className={styles.skills}>
            {aboutContent.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="about-education-title">
          <h2 id="about-education-title">{aboutContent.educationHeading}</h2>
          <p className={styles.school}>{aboutContent.school}</p>
          <p className={styles.dates}>{aboutContent.dates}</p>
        </section>
      </div>
    </article>
  );
};
