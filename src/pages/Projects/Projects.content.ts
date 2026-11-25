export type Project = {
  id: string;
  title: string;
  description: string;
  type?: string;
  stack: readonly string[];
  appUrl?: string;
  projectUrl?: string;
  screenshotLightUrl?: string;
  screenshotDarkUrl?: string;
};

export const projectsContent = {
  title: "Projects",
  introduction: "A space for selected work. Project details are coming soon.",
  stackLabel: "Project stack",
  appLink: "Live app",
  projectLink: "Source code",
  projects: [
    {
      id: "project-01",
      title: "[Project 01 - add a title]",
      description: "[Add a short description of this project.]",
      stack: ["[Add technology]", "[Add tool]"],
      appUrl: "https://bite-psi-lac.vercel.app/",
      projectUrl: "https://github.com/rosenberg-c/bite",
      screenshotLightUrl:
        "https://raw.githubusercontent.com/rosenberg-c/bite/refs/heads/main/screenshots/screenshot-light.png",
      screenshotDarkUrl:
        "https://raw.githubusercontent.com/rosenberg-c/bite/refs/heads/main/screenshots/screenshot-dark.png",
    },
    {
      id: "project-02",
      title: "[Project 02 - add a title]",
      description: "[Add a short description of this project.]",
      stack: ["[Add technology]", "[Add tool]"],
    },
    {
      id: "project-03",
      title: "[Project 03 - add a title]",
      description: "[Add a short description of this project.]",
      stack: ["[Add technology]", "[Add tool]"],
    },
  ] satisfies readonly Project[],
} as const;
