import { act } from "react";
import { expect, it } from "vite-plus/test";
import { ThemeProvider } from "../../features/theme/ThemeContext";
import { STORAGE_KEY } from "../../features/theme/theme-core";
import { mount, renderApp } from "../../test/setup";
import { projectsContent, type Project } from "./Projects.content";
import { ProjectCard } from "./components/ProjectCard";

it("selects the project screenshot for the resolved theme and updates it on change", () => {
  localStorage.setItem(STORAGE_KEY, "light");
  const host = renderApp("/projects");
  const image = host.querySelector("main article img");
  const project = projectsContent.projects[0];
  expect(project.screenshotLightUrl).toBe(
    "https://raw.githubusercontent.com/rosenberg-c/bite/refs/heads/main/docs/screenshots/screenshot-light.png",
  );
  expect(project.screenshotDarkUrl).toBe(
    "https://raw.githubusercontent.com/rosenberg-c/bite/refs/heads/main/docs/screenshots/screenshot-dark.png",
  );
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

it("shows the WebCV dark screenshot in both themes without a light screenshot", () => {
  localStorage.setItem(STORAGE_KEY, "light");
  const host = renderApp("/projects");
  const webcv = host.querySelector("main section > ul > li:last-child article");
  const screenshot =
    "https://raw.githubusercontent.com/rosenberg-c/webcv/refs/heads/master/docs/screenshots/screenshot-dark.png";
  expect(projectsContent.projects[6].screenshotDarkUrl).toBe(screenshot);
  expect(webcv?.querySelector("img")?.getAttribute("src")).toBe(screenshot);
  expect(webcv?.querySelector("img")?.getAttribute("alt")).toBe(
    "Screenshot of WebCV",
  );

  const select = host.querySelector("#theme-preference");
  act(() => {
    if (select instanceof HTMLSelectElement) {
      select.value = "dark";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
  expect(webcv?.querySelector("img")?.getAttribute("src")).toBe(screenshot);
});

it("fits the MIDIVerse screenshot without changing other project images", () => {
  const host = renderApp("/projects");
  const cards = host.querySelectorAll("main section > ul > li article");
  const midiverse = cards[3]?.querySelector("img");

  expect(midiverse?.getAttribute("src")).toBe(
    projectsContent.projects[3].screenshotLightUrl,
  );
  expect(midiverse?.parentElement?.className).toContain("fitImage");
  expect(
    cards[0]?.querySelector("img")?.parentElement?.className,
  ).not.toContain("fitImage");
});

it("lists WebCV after existing projects with live and source links", () => {
  const host = renderApp("/projects");
  const cards = host.querySelectorAll("main section > ul > li article");
  const webcv = cards[cards.length - 1];

  expect(projectsContent.projects.map((project) => project.id)).toEqual([
    "project-01",
    "spicy",
    "softwrap",
    "midiverse",
    "octop",
    "muxler",
    "webcv",
  ]);
  expect(webcv?.querySelector("h2")?.textContent).toBe("WebCV");
  expect(
    Array.from(webcv?.querySelectorAll("a") ?? [], (link) => [
      link.textContent,
      link.getAttribute("href"),
    ]),
  ).toEqual([
    ["View app", "https://webcv-umber.vercel.app/"],
    ["Source code", "https://github.com/rosenberg-c/webcv"],
  ]);
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
  projectsContent.projects.forEach((project: Project, index) => {
    const card = cards?.[index]?.querySelector("article");
    expect(card?.querySelector("h2")?.textContent).toBe(project.title);
    expect(card?.querySelector("p")?.textContent).toBe(project.description);
    const stack = card?.querySelector("ul");
    expect(stack?.getAttribute("aria-label")).toBe(projectsContent.stackLabel);
    expect(
      Array.from(stack?.querySelectorAll("li") ?? [], (li) => li.textContent),
    ).toEqual([...project.stack]);
    const image = card?.querySelector("article > div img");
    const screenshot = project.screenshotLightUrl ?? project.screenshotDarkUrl;
    if (screenshot) {
      expect(image?.getAttribute("src")).toBe(screenshot);
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
