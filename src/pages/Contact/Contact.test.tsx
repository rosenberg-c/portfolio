import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router";
import { afterEach, expect, it } from "vite-plus/test";
import { App } from "../../App";
import { ThemeProvider } from "../../features/theme/ThemeContext";
import { projectsContent } from "../Projects/Projects.content";
import { contactContent } from "./Contact.content";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  document.body.replaceChildren();
});

it("renders editable contact placeholders and a working projects action", () => {
  const host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() =>
    root?.render(
      <ThemeProvider>
        <MemoryRouter initialEntries={["/contact"]}>
          <App />
        </MemoryRouter>
      </ThemeProvider>,
    ),
  );

  const main = host.querySelector("main#main-content");
  expect(main?.querySelector("h1")?.textContent).toBe(contactContent.title);
  expect(main?.textContent).toContain(contactContent.invitation);
  expect(main?.textContent).toContain(contactContent.notice);
  expect(main?.querySelector("h2")?.textContent).toBe(
    contactContent.channelsHeading,
  );
  const channels = main?.querySelectorAll("dl > div");
  expect(channels).toHaveLength(contactContent.channels.length);
  contactContent.channels.forEach(({ label, detail }, index) => {
    expect(channels?.[index].querySelector("dt")?.textContent).toBe(label);
    expect(channels?.[index].querySelector("dd")?.textContent).toBe(detail);
  });
  expect(main?.querySelectorAll("a")).toHaveLength(1);
  expect(
    main?.querySelector("button, form, a[href^='mailto:'], a[href^='http']"),
  ).toBeNull();
  expect(
    host.querySelector('nav a[href="/contact"]')?.getAttribute("aria-current"),
  ).toBe("page");

  const projects = main?.querySelector('a[href="/projects"]');
  expect(projects?.textContent).toBe(contactContent.projectsCta);
  act(() => {
    projects?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(main?.querySelector("h1")?.textContent).toBe(projectsContent.title);
});
