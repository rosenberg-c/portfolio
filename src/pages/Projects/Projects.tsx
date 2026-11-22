import { projectsContent } from "./Projects.content";
import styles from "./Projects.module.css";

export const Projects = () => {
  return (
    <section className={styles.page} aria-labelledby="projects-title">
      <header className={styles.heading}>
        <h1 id="projects-title">{projectsContent.title}</h1>
        <p>{projectsContent.introduction}</p>
      </header>
      <ul className={styles.grid}>
        {projectsContent.projects.map((project) => (
          <li key={project.id} className={styles.card}>
            <article>
              <div className={styles.visual} aria-hidden="true" />
              <div className={styles.cardBody}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <ul
                  className={styles.stack}
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
  );
};
