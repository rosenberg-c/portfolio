import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it } from "vite-plus/test";
import { App } from "../../App";
import { ThemeProvider } from "../../features/theme/ThemeContext";
import { aboutContent } from "./About.content";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  document.body.replaceChildren();
});

it("renders About placeholders and sections on the existing route", () => {
  const host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() =>
    root?.render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/about"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    ),
  );

  const main = host.querySelector("main#main-content");
  expect(main?.querySelector("h1")?.textContent).toBe(aboutContent.title);
  expect(main?.querySelectorAll("section h2")).toHaveLength(3);
  expect(main?.textContent).toContain(aboutContent.bio);
  expect(main?.querySelector("ul li")?.textContent).toBe(
    aboutContent.skills[0],
  );
  expect(main?.textContent).toContain(aboutContent.school);
  expect(main?.textContent).toContain(aboutContent.dates);
  expect(main?.querySelector('[aria-hidden="true"]')).not.toBeNull();
  expect(
    host.querySelector('nav a[href="/about"]')?.getAttribute("aria-current"),
  ).toBe("page");
});
