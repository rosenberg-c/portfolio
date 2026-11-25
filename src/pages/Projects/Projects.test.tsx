import { act } from "react";
import { expect, it } from "vite-plus/test";
import { ThemeProvider } from "../../features/theme/ThemeContext";
import { STORAGE_KEY } from "../../features/theme/theme-core";
import { mount, renderApp } from "../../test/setup";
import { projectsContent } from "./Projects.content";
import { ProjectCard } from "./components/ProjectCard";

it("selects the project screenshot for the resolved theme and updates it on change", () => {
  localStorage.setItem(STORAGE_KEY, "light");
  const host = renderApp("/projects");
  const image = host.querySelector("main article img");
  const project = projectsContent.projects[0];
  expect(image?.getAttribute("src")).toBe(project.screenshotLightUrl);

  const select = host.querySelector("#theme-preference");
  act(() => {
    if (select instanceof HTMLSelectElement) {
      select.value = "dark";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
  expect(image?.getAttribute("src")).toBe(project.screenshotDarkUrl);
});

it("falls back to the light project screenshot when the dark one is missing", () => {
  localStorage.setItem(STORAGE_KEY, "dark");
  const host = mount(
    <ThemeProvider>
      <ProjectCard
        project={{
          id: "light-only",
          title: "Light only",
          description: "A sample.",
          stack: [],
          screenshotLightUrl: "/light.png",
        }}
      />
    </ThemeProvider>,
    "ul",
  );
  expect(host.querySelector("article img")?.getAttribute("src")).toBe(
    "/light.png",
  );
});

it("falls back to the dark project screenshot when the light one is missing", () => {
  localStorage.setItem(STORAGE_KEY, "light");
  const host = mount(
    <ThemeProvider>
      <ProjectCard
        project={{
          id: "dark-only",
          title: "Dark only",
          description: "A sample.",
          stack: [],
          screenshotDarkUrl: "/dark.png",
        }}
      />
    </ThemeProvider>,
    "ul",
  );
  expect(host.querySelector("article img")?.getAttribute("src")).toBe(
    "/dark.png",
  );
});

it("renders projects with links only for supplied destinations", () => {
  const host = renderApp("/projects");

  const main = host.querySelector("main#main-content");
  expect(main?.querySelector("h1")?.textContent).toBe(projectsContent.title);
  expect(main?.textContent).toContain(projectsContent.introduction);
  const list = main?.querySelector("section > ul");
  expect(list?.classList.contains("app-grid")).toBe(true);
  const cards = list?.querySelectorAll(":scope > li");
  expect(cards).toHaveLength(projectsContent.projects.length);
  projectsContent.projects.forEach((project, index) => {
    const card = cards?.[index]?.querySelector("article");
    expect(card?.querySelector("h2")?.textContent).toBe(project.title);
    expect(card?.querySelector("p")?.textContent).toBe(project.description);
    const stack = card?.querySelector("ul");
    expect(stack?.getAttribute("aria-label")).toBe(projectsContent.stackLabel);
    expect(
      Array.from(stack?.querySelectorAll("li") ?? [], (li) => li.textContent),
    ).toEqual([...project.stack]);
    const image = card?.querySelector("article > div img");
    if ("screenshotLightUrl" in project && project.screenshotLightUrl) {
      expect(image?.getAttribute("src")).toBe(project.screenshotLightUrl);
      expect(image?.getAttribute("alt")).toBe(`Screenshot of ${project.title}`);
      expect(card?.querySelector('[aria-hidden="true"]')).toBeNull();
    } else {
      expect(image).toBeNull();
      expect(card?.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
    }
    expect(card?.querySelector("h2 a")).toBeNull();
    expect(
      Array.from(card?.querySelectorAll("p") ?? [], (p) => p.textContent),
    ).toEqual([
      project.description,
      ...("type" in project && project.type ? [project.type] : []),
    ]);
    expect(
      Array.from(card?.querySelectorAll("a") ?? [], (link) => [
        link.textContent,
        link.getAttribute("href"),
      ]),
    ).toEqual([
      ...("appUrl" in project && project.appUrl
        ? [[projectsContent.appLink, project.appUrl]]
        : []),
      ...("projectUrl" in project && project.projectUrl
        ? [["Source code", project.projectUrl]]
        : []),
    ]);
  });
  expect(
    host.querySelector('nav a[href="/projects"]')?.getAttribute("aria-current"),
  ).toBe("page");
});
