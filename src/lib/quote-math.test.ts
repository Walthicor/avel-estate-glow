import { expect, test } from "bun:test";

import {
  firstFloorMax,
  formatCOP,
  investmentRange,
  totalPossibleArea,
} from "./quote-math";

test("rural lot keeps 35% of the area on the ground floor", () => {
  expect(firstFloorMax(1000, "rural")).toBe(350);
});

test("urban lot keeps 80% of the area on the ground floor", () => {
  expect(firstFloorMax(1000, "urbano")).toBe(800);
});

test("total area is the ground floor times the requested floors", () => {
  expect(totalPossibleArea({ lotAreaM2: 1000, predio: "urbano", floors: 3 })).toBe(2400);
});

test("an area typed by the person wins over the calculated one", () => {
  expect(
    totalPossibleArea({ lotAreaM2: 1000, predio: "urbano", floors: 3, buildAreaM2: 1500 }),
  ).toBe(1500);
});

test("mid-range finishes cost 2.5 to 3.5 million pesos per m²", () => {
  expect(investmentRange(2400, "medios")).toEqual({ min: 6_000_000_000, max: 8_400_000_000 });
});

test("high-end finishes cost 4.5 to 7 million pesos per m²", () => {
  expect(investmentRange(2400, "alta")).toEqual({ min: 10_800_000_000, max: 16_800_000_000 });
});

test("amounts are shown in Colombian pesos", () => {
  // es-CO puts a non-breaking space between the sign and the figure.
  expect(formatCOP(6_000_000_000).replace(/\u00a0/g, " ")).toBe("$ 6.000.000.000");
});

test("an empty lot area estimates nothing instead of NaN", () => {
  expect(firstFloorMax(0, "urbano")).toBe(0);
  expect(investmentRange(0, "medios")).toEqual({ min: 0, max: 0 });
});
