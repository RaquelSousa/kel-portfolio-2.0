import type {
  expect,
  test,
  describe,
  it,
  vi,
  beforeEach,
  afterEach,
} from "vitest";

declare global {
  const expect: typeof expect;
  const test: typeof test;
  const describe: typeof describe;
  const it: typeof it;
  const vi: typeof vi;
  const beforeEach: typeof beforeEach;
  const afterEach: typeof afterEach;
}
