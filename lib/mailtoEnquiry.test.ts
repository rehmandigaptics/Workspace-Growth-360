import { describe, expect, it } from "vitest";
import { buildEnquiryMailto } from "./mailtoEnquiry";

describe("buildEnquiryMailto", () => {
  it("builds subject and body for grow@360growthlab.com", () => {
    const href = buildEnquiryMailto({
      name: "Ada Lovelace",
      email: "ada@example.com",
      phone: "555-0100",
      service: "CRM Solutions",
      message: "Need a pipeline setup",
    });
    expect(href.startsWith("mailto:grow@360growthlab.com?")).toBe(true);
    expect(href).toContain(
      encodeURIComponent("Workspace Growth 360 enquiry — CRM Solutions"),
    );
    expect(href).toContain(encodeURIComponent("Name: Ada Lovelace"));
    expect(href).toContain(encodeURIComponent("Need a pipeline setup"));
  });

  it("uses dash for empty phone", () => {
    const href = buildEnquiryMailto({
      name: "Ada",
      email: "ada@example.com",
      phone: "",
      service: "General",
      message: "Hi",
    });
    expect(href).toContain(encodeURIComponent("Phone: -"));
  });
});
