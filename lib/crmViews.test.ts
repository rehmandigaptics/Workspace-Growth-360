import { describe, expect, it } from "vitest";
import { renderCrmDashboardHtml, crmViews } from "./crmViews";

describe("renderCrmDashboardHtml", () => {
  it("renders pipeline title by default key", () => {
    const html = renderCrmDashboardHtml("pipeline");
    expect(html).toContain("Sales pipeline");
    expect(html).toContain("crm47-kanban");
    expect(html).toContain(crmViews.pipeline.footer);
  });

  it("switches content for automation view", () => {
    const html = renderCrmDashboardHtml("automation");
    expect(html).toContain("Automation flow");
    expect(html).toContain("Workflow steps");
  });
});
