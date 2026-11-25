import { expect, it } from "vite-plus/test";
import { renderApp } from "../../test/setup";
import { aboutContent } from "./About.content";

it("renders a concise bio, skills, and education on the existing route", () => {
  const host = renderApp("/about");

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
