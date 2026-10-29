import { describe, expect, it } from "vitest";
import { sitePath, withBasePathInHtml } from "./sitePath";

describe("sitePath", () => {
  it("keeps local paths unchanged without a base path", () => {
    expect(sitePath("/contact")).toBe("/contact");
  });

  it("rewrites root-relative HTML URLs when a deployment base path is set", () => {
    const html =
      '<a href="/contact">Contact</a><img src="/assets/logo.png"><div style="background:url(\'/assets/bg.webp\')"></div>';
    expect(sitePath("/contact", "/Workspace-Growth-360")).toBe(
      "/Workspace-Growth-360/contact",
    );
    expect(withBasePathInHtml(html, "/Workspace-Growth-360")).toBe(
      '<a href="/Workspace-Growth-360/contact">Contact</a><img src="/Workspace-Growth-360/assets/logo.png"><div style="background:url(\'/Workspace-Growth-360/assets/bg.webp\')"></div>',
    );
  });
});
