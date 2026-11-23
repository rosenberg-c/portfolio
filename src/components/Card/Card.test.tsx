import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, expect, it } from "vite-plus/test";
import { Card } from "./Card";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;

afterEach(() => {
  act(() => root?.unmount());
  root = undefined;
  document.body.replaceChildren();
});

it("renders independently with caller-supplied content and heading level", () => {
  const host = document.createElement("ul");
  document.body.appendChild(host);
  root = createRoot(host);
  act(() =>
    root?.render(
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
    ),
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
