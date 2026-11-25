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
  introduction: "Selected projects and experiments.",
  stackLabel: "Project stack",
  appLink: "View app",
  projectLink: "Source code",
  projects: [
    {
      id: "project-01",
      title: "Bite",
      description: "A web app experiment.",
      stack: ["React", "TypeScript", "React Router", "Vite+"],
      appUrl: "https://bite-psi-lac.vercel.app/",
      projectUrl: "https://github.com/rosenberg-c/bite",
      screenshotLightUrl:
        "https://raw.githubusercontent.com/rosenberg-c/bite/refs/heads/main/docs/screenshots/screenshot-light.png",
      screenshotDarkUrl:
        "https://raw.githubusercontent.com/rosenberg-c/bite/refs/heads/main/docs/screenshots/screenshot-dark.png",
    },
    {
      id: "spicy",
      title: "Spicy",
      description:
        "AI tooling for the CLI, Neovim, and Hammerspoon built on the OpenCode API.",
      stack: ["CLI", "Neovim", "Hammerspoon"],
      projectUrl: "https://github.com/rosenberg-c/spicy",
    },
    {
      id: "midiverse",
      title: "MIDIVerse",
      description: "A macOS app for manipulating MIDI data and streams.",
      stack: ["SwiftUI", "macOS"],
      appUrl:
        "https://apps.apple.com/se/app/midiverse/id6740984664?l=en-GB&mt=12",
    },
    {
      id: "webcv",
      title: "WebCV",
      description: "A personal CV website with content managed in JSON.",
      stack: ["TypeScript", "Vite+", "CSS", "JSON"],
      appUrl: "https://webcv-umber.vercel.app/",
      projectUrl: "https://github.com/rosenberg-c/webcv",
      screenshotDarkUrl:
        "https://raw.githubusercontent.com/rosenberg-c/webcv/refs/heads/master/docs/screenshots/screenshot-dark.png",
    },
  ] satisfies readonly Project[],
} as const;
