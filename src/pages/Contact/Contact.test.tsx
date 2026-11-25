import { act } from "react";
import { expect, it } from "vite-plus/test";
import { renderApp } from "../../test/setup";
import { projectsContent } from "../Projects/Projects.content";
import { contactContent } from "./Contact.content";

it("renders a LinkedIn link that opens in a new tab and a working projects action", () => {
  const host = renderApp("/contact");

  const main = host.querySelector("main#main-content");
  expect(main?.querySelector("h1")?.textContent).toBe(contactContent.title);
  expect(main?.textContent).toContain(contactContent.invitation);
  expect(main?.textContent).toContain(contactContent.notice);
  expect(main?.querySelector("h2")?.textContent).toBe(
    contactContent.channelsHeading,
  );
  const channels = main?.querySelectorAll("dl > div");
  expect(channels).toHaveLength(contactContent.channels.length);
  contactContent.channels.forEach(({ label, url }, index) => {
    expect(channels?.[index].querySelector("dt")?.textContent).toBe(label);
    const link = channels?.[index].querySelector("dd a");
    expect(link?.textContent).toBe(url);
    expect(link?.getAttribute("href")).toBe(url);
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
  });
  expect(main?.querySelectorAll("a")).toHaveLength(2);
  expect(main?.querySelector("button, form, a[href^='mailto:']")).toBeNull();
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
