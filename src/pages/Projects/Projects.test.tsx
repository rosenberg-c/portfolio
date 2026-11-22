import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it } from "vite-plus/test";
import { App } from "../../App";
import { ThemeProvider } from "../../features/theme/ThemeContext";
import { projectsContent } from "./Projects.content";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  document.body.replaceChildren();
});

it("renders editable project placeholders without unverified destinations", () => {
  const host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() =>
    root?.render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/projects"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    ),
  );

  const main = host.querySelector("main#main-content");
  expect(main?.querySelector("h1")?.textContent).toBe(projectsContent.title);
  expect(main?.textContent).toContain(projectsContent.introduction);
  const cards = main?.querySelectorAll("article");
  expect(cards).toHaveLength(projectsContent.projects.length);
  projectsContent.projects.forEach((project, index) => {
    const card = cards?.[index];
    expect(card?.querySelector("h2")?.textContent).toBe(project.title);
    expect(card?.querySelector("p")?.textContent).toBe(project.description);
    expect(card?.querySelectorAll("ul li")).toHaveLength(project.stack.length);
    expect(card?.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
    expect(card?.querySelector("a, button")).toBeNull();
  });
  expect(
    host.querySelector('nav a[href="/projects"]')?.getAttribute("aria-current"),
  ).toBe("page");
});
