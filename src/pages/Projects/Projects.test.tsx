import { expect, it } from "vite-plus/test";
import { renderApp } from "../../test/setup";
import { projectsContent } from "./Projects.content";

it("renders editable project placeholders without unverified destinations", () => {
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
    expect(card?.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
    expect(card?.querySelector("a, button")).toBeNull();
  });
  expect(
    host.querySelector('nav a[href="/projects"]')?.getAttribute("aria-current"),
  ).toBe("page");
});
