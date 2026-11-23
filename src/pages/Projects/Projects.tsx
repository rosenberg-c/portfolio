import { Card } from "../../components/Card/Card";
import { projectsContent } from "./Projects.content";
import styles from "./Projects.module.css";

export const Projects = () => {
  return (
    <section className={styles.page} aria-labelledby="projects-title">
      <header className={styles.heading}>
        <h1 id="projects-title">{projectsContent.title}</h1>
        <p>{projectsContent.introduction}</p>
      </header>
      <ul className="app-grid">
        {projectsContent.projects.map((project, index) => (
          <Card
            key={project.id}
            card={project}
            stackLabel={projectsContent.stackLabel}
            visualVariant={
              index === 1 ? "round" : index === 2 ? "organic" : "default"
            }
          />
        ))}
      </ul>
    </section>
  );
};
