import { expect, it } from "vite-plus/test";
import { mount } from "../../test/setup";
import { Card } from "./Card";

it("renders independently with caller-supplied content and heading level", () => {
  const host = mount(
    <Card
      card={{
        title: "Unrelated example",
        description: "A standalone card.",
        stack: ["Sample tool", "Other tool"],
      }}
      stackLabel="Example technologies"
      headingLevel={3}
      visualVariant="organic"
    />,
    "ul",
  );

  const card = host.querySelector(":scope > li > article");
  expect(card?.querySelector("h3")?.textContent).toBe("Unrelated example");
  expect(card?.querySelector("h2")).toBeNull();
  expect(card?.querySelectorAll("p")).toHaveLength(1);
  expect(card?.querySelector("p")?.textContent).toBe("A standalone card.");
  const stack = card?.querySelector('ul[aria-label="Example technologies"]');
  expect(
    Array.from(stack?.querySelectorAll("li") ?? [], (li) => li.textContent),
  ).toEqual(["Sample tool", "Other tool"]);
  expect(card?.querySelector('[aria-hidden="true"]')).not.toBeNull();
  expect(card?.querySelector("img")).toBeNull();
  expect(card?.querySelector("a, button")).toBeNull();
});

it("renders a caller-supplied image with descriptive alt text", () => {
  const host = mount(
    <Card
      card={{
        title: "Live example",
        description: "A deployed example.",
        stack: [],
        screenshotUrl: "https://example.com/screenshot.png",
      }}
      stackLabel="Example technologies"
    />,
    "ul",
  );

  const visual = host.querySelector("article > div");
  const image = visual?.querySelector("img");
  expect(image?.getAttribute("src")).toBe("https://example.com/screenshot.png");
  expect(image?.getAttribute("alt")).toBe("Screenshot of Live example");
  expect(visual?.getAttribute("aria-hidden")).toBeNull();
});

it("shows optional details and caller-supplied links below the description", () => {
  const host = mount(
    <Card
      card={{
        title: "Live example",
        description: "A deployed example.",
        type: "Web app",
        stack: ["React"],
        links: [
          { label: "Live app", url: "https://example.com/app" },
          { label: "Source code", url: "https://example.com/source" },
        ],
      }}
      stackLabel="Example technologies"
    />,
    "ul",
  );

  const card = host.querySelector("article");
  expect(card?.querySelector("h2")?.textContent).toBe("Live example");
  expect(card?.querySelector("h2 a")).toBeNull();
  expect(
    Array.from(card?.querySelectorAll("p") ?? [], (p) => p.textContent),
  ).toEqual(["A deployed example.", "Web app"]);
  expect(
    Array.from(card?.querySelectorAll("a") ?? [], (link) => [
      link.textContent,
      link.getAttribute("href"),
      link.getAttribute("target"),
      link.getAttribute("rel"),
    ]),
  ).toEqual([
    ["Live app", "https://example.com/app", "_blank", "noopener noreferrer"],
    [
      "Source code",
      "https://example.com/source",
      "_blank",
      "noopener noreferrer",
    ],
  ]);
  expect(
    card?.querySelector("p + p + div")?.querySelectorAll("a"),
  ).toHaveLength(2);
});

it("renders no links when none are supplied", () => {
  const host = mount(
    <Card
      card={{ title: "No links", description: "A sample.", stack: [] }}
      stackLabel="Example technologies"
    />,
    "ul",
  );

  expect(host.querySelectorAll("article p")).toHaveLength(1);
  expect(host.querySelector("article a")).toBeNull();
});
