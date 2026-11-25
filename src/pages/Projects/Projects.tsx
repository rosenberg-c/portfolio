import { ProjectCard } from "./components/ProjectCard";
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
          <ProjectCard
            key={project.id}
            project={project}
            visualVariant={
              index === 1 ? "round" : index === 2 ? "organic" : "default"
            }
          />
        ))}
      </ul>
    </section>
  );
};
