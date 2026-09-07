import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

test("Next.js stays on the patched 15.1 security release", () => {
  assert.equal(packageJson.dependencies.next, "15.1.11");
  assert.equal(packageJson.devDependencies["eslint-config-next"], "15.1.11");
});
