import { Card } from "../../../components/Card/Card";
import { useTheme } from "../../../features/theme/useTheme";
import { projectsContent, type Project } from "../Projects.content";

type ProjectCardProps = {
  project: Project;
  headingLevel?: 2 | 3;
  visualVariant?: "default" | "round" | "organic";
};

export const ProjectCard = ({
  project,
  headingLevel,
  visualVariant,
}: ProjectCardProps) => {
  const { resolvedTheme } = useTheme();
  const screenshotUrl =
    resolvedTheme === "dark"
      ? (project.screenshotDarkUrl ?? project.screenshotLightUrl)
      : (project.screenshotLightUrl ?? project.screenshotDarkUrl);
  const links = [
    ...(project.appUrl
      ? [{ label: projectsContent.appLink, url: project.appUrl }]
      : []),
    ...(project.projectUrl
      ? [{ label: projectsContent.projectLink, url: project.projectUrl }]
      : []),
  ];

  return (
    <Card
      card={{
        title: project.title,
        description: project.description,
        type: project.type,
        stack: project.stack,
        screenshotUrl,
        fitImage: project.fitImage,
        links,
      }}
      stackLabel={projectsContent.stackLabel}
      headingLevel={headingLevel}
      visualVariant={visualVariant}
    />
  );
};
