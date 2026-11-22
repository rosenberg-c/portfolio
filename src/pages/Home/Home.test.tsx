import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it } from "vite-plus/test";
import { App } from "../../App";
import { ThemeProvider } from "../../features/theme/ThemeContext";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  document.body.replaceChildren();
});

it("renders a shared accessible header and routes hero actions to empty pages", () => {
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
  expect(main?.querySelector("h1")).toBeNull();
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
  expect(main?.querySelector("h1")).toBeNull();
  expect(
    nav?.querySelector('a[href="/contact"]')?.getAttribute("aria-current"),
  ).toBe("page");
});
