import { execFileSync } from "node:child_process";
import { expect, it } from "vite-plus/test";

const dryRun = (target) =>
  execFileSync("make", ["-n", target], { encoding: "utf8" });

it("builds before starting the static screenshot server", () => {
  const commands = dryRun("screenshot-server-start");
  expect(commands.indexOf("vp run build")).toBeLessThan(
    commands.indexOf("docker run -d"),
  );
  expect(commands).toContain("-p 5199:80");
  expect(commands).toContain("/dist:/usr/share/nginx/html:ro");
  expect(commands).toContain("http://localhost:5199/");
});

it("checks checkout ownership before removing the server", () => {
  const commands = dryRun("screenshot-server-stop");
  expect(commands.indexOf("docker inspect")).toBeLessThan(
    commands.indexOf("docker rm -f"),
  );
  expect(commands).toContain("dev.local.screenshot-server");
});

it("keeps the screenshot client pointed at the static server", () => {
  expect(dryRun("screenshot-puppeteer")).toContain(
    "http://host.docker.internal:5199",
  );
});
