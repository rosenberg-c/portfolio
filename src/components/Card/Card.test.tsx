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
  expect(card?.querySelector("p")?.textContent).toBe("A standalone card.");
  const stack = card?.querySelector('ul[aria-label="Example technologies"]');
  expect(
    Array.from(stack?.querySelectorAll("li") ?? [], (li) => li.textContent),
  ).toEqual(["Sample tool", "Other tool"]);
  expect(card?.querySelector('[aria-hidden="true"]')).not.toBeNull();
  expect(card?.querySelector("a, button")).toBeNull();
});
