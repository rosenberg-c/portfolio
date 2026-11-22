import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it } from "vite-plus/test";
import { App } from "../../App";
import { ThemeProvider } from "../../features/theme/ThemeContext";
import { aboutContent } from "../About/About.content";
import { projectsContent } from "../Projects/Projects.content";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  document.body.replaceChildren();
});

it("renders a shared accessible header and routes hero actions", () => {
  const host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() =>
    root?.render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    ),
  );

  const nav = host.querySelector('nav[aria-label="Primary navigation"]');
  const main = host.querySelector("main#main-content");
  expect(nav?.querySelectorAll("a")).toHaveLength(4);
  expect(host.querySelector('a[href="#main-content"]')?.textContent).toBe(
    "Skip to main content",
  );
  expect(main?.getAttribute("tabindex")).toBe("-1");
  expect(host.querySelector("header label select")).not.toBeNull();
  expect(nav?.querySelector("select")).toBeNull();
  expect(main?.querySelector("h1")?.textContent).toBe("Hello");

  const projects = main?.querySelector('a[href="/projects"]');
  expect(projects?.textContent).toBe("View projects");
  act(() => {
    projects?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(main?.querySelector("h1")?.textContent).toBe(projectsContent.title);
  expect(main?.querySelector("a")).toBeNull();
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
  const host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() =>
    root?.render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    ),
  );

  const main = host.querySelector("main#main-content");
  const sections = main?.querySelectorAll("section");
  expect(sections).toHaveLength(2);
  expect(sections?.[0]?.querySelector("h1")?.textContent).toBe("Hello");
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
