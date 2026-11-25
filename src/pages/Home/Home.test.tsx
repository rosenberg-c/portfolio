import { act } from "react";
import { expect, it } from "vite-plus/test";
import { renderApp } from "../../test/setup";
import { aboutContent } from "../About/About.content";
import { projectsContent } from "../Projects/Projects.content";
import { homeContent } from "./Home.content";

it("renders a shared accessible header and routes hero actions", () => {
  const host = renderApp();

  const nav = host.querySelector('nav[aria-label="Primary navigation"]');
  const main = host.querySelector("main#main-content");
  expect(nav?.querySelectorAll("a")).toHaveLength(4);
  expect(host.querySelector('a[href="#main-content"]')?.textContent).toBe(
    "Skip to main content",
  );
  expect(main?.getAttribute("tabindex")).toBe("-1");
  expect(host.querySelector("header label select")).not.toBeNull();
  expect(nav?.querySelector("select")).toBeNull();
  expect(main?.querySelector("h1")?.textContent).toBe(homeContent.hero.title);

  const projects = main?.querySelector('a[href="/projects"]');
  expect(projects?.textContent).toBe("View projects");
  act(() => {
    projects?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(main?.querySelector("h1")?.textContent).toBe(projectsContent.title);
  expect(
    nav?.querySelector('a[href="/projects"]')?.getAttribute("aria-current"),
  ).toBe("page");

  const home = nav?.querySelector('a[href="/"]');
  act(() => {
    home?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  const contact = main?.querySelector('a[href="/contact"]');
  expect(contact?.textContent).toBe("Get in touch");
  act(() => {
    contact?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(main?.querySelector("h1")?.textContent).toBe("Get in touch");
  expect(
    nav?.querySelector('a[href="/contact"]')?.getAttribute("aria-current"),
  ).toBe("page");
});

it("shows the About preview below the hero and links to the About page", () => {
  const host = renderApp();

  const main = host.querySelector("main#main-content");
  const sections = main?.querySelectorAll("section");
  expect(sections).toHaveLength(3);
  expect(sections?.[0]?.querySelector("h1")?.textContent).toBe(
    homeContent.hero.title,
  );
  const preview = sections?.[1];
  expect(preview?.getAttribute("aria-labelledby")).toBe("home-about-title");
  expect(preview?.querySelector("h2")?.textContent).toBe(aboutContent.title);
  expect(preview?.textContent).toContain(aboutContent.bio);
  expect(preview?.querySelector("h3")?.textContent).toBe(
    aboutContent.skillsHeading,
  );
  expect(preview?.querySelector("ul li")?.textContent).toBe(
    aboutContent.skills[0],
  );
  expect(preview?.textContent).toContain(aboutContent.educationHeading);
  expect(preview?.textContent).toContain(aboutContent.school);
  expect(preview?.textContent).toContain(aboutContent.dates);
  expect(preview?.querySelector('[aria-hidden="true"]')).not.toBeNull();

  const aboutLink = preview?.querySelector('a[href="/about"]');
  expect(aboutLink?.textContent).toBe("More about me");
  act(() => {
    aboutLink?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(main?.querySelector("h1")?.textContent).toBe(aboutContent.title);
  expect(main?.querySelector('a[href="/about"]')).toBeNull();
});

it("shows selected Projects after About and routes View all to the full page", () => {
  const host = renderApp();

  const main = host.querySelector("main#main-content");
  const sections = main?.querySelectorAll("section");
  expect(sections).toHaveLength(3);
  expect(sections?.[1]?.getAttribute("aria-labelledby")).toBe(
    "home-about-title",
  );
  const preview = sections?.[2];
  expect(preview?.getAttribute("aria-labelledby")).toBe("home-projects-title");
  expect(preview?.querySelector("h2")?.textContent).toBe(projectsContent.title);
  const list = preview?.querySelector("ul");
  expect(list?.classList.contains("app-grid")).toBe(true);
  const cards = list?.querySelectorAll(":scope > li");
  expect(cards).toHaveLength(2);
  projectsContent.projects.slice(0, 2).forEach((project, index) => {
    const card = cards?.[index]?.querySelector("article");
    expect(card?.querySelector("h3")?.textContent).toBe(project.title);
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
      expect(card?.querySelector('[aria-hidden="true"]')).not.toBeNull();
    }
    expect(card?.querySelector("h3 a")).toBeNull();
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
  const viewAll = preview?.querySelector('a[href="/projects"]');
  expect(viewAll?.textContent).toBe(homeContent.projects.cta);
  act(() => {
    viewAll?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(main?.querySelector("h1")?.textContent).toBe(projectsContent.title);
  expect(main?.querySelectorAll("article")).toHaveLength(
    projectsContent.projects.length,
  );
});
