import { describe, expect, it } from "vitest";
import { v69Examples } from "./v69Journey";

describe("v69Examples", () => {
  it("matches crm.html journey steps", () => {
    expect(v69Examples).toHaveLength(4);
    expect(v69Examples[0].title).toBe("Capture new enquiries");
    expect(v69Examples[3].icon).toBe("bi-check-circle");
  });
});
