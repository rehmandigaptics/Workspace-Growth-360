export type CrmViewKey = "pipeline" | "booking" | "members" | "automation";

export type CrmViewData = {
  title: string;
  sub: string;
  stats: [string, string][];
  cols: string[][];
  footer: string;
};

export const crmViews: Record<CrmViewKey, CrmViewData> = {
  pipeline: {
    title: "Sales pipeline",
    sub: "See every opportunity at a glance",
    stats: [
      ["18", "New enquiries"],
      ["7", "Booked consultations"],
      ["5", "Ready to close"],
    ],
    cols: [
      ["New leads", "New website enquiry", "CRM implementation request"],
      ["In progress", "Consultation booked", "Proposal shared"],
      ["Converted", "Deal won", "New client onboarded"],
    ],
    footer: "Move leads forward with a clear, organized pipeline.",
  },
  booking: {
    title: "Consultation overview",
    sub: "Manage discovery calls, demos and follow-ups",
    stats: [
      ["12", "Consultation requests"],
      ["8", "Confirmed"],
      ["3", "Follow-ups"],
    ],
    cols: [
      ["Requested", "CRM discovery call", "Automation demo request"],
      ["Confirmed", "Sales consultation", "Solution walkthrough"],
      ["Completed", "Discovery completed", "Proposal accepted"],
    ],
    footer:
      "A clearer path from first enquiry to a productive consultation.",
  },
  members: {
    title: "Contact management",
    sub: "Build stronger customer relationships",
    stats: [
      ["56", "Sample contacts"],
      ["14", "Active clients"],
      ["9", "Tasks due"],
    ],
    cols: [
      ["New contacts", "Startup founder", "Remote professional"],
      [
        "Active clients",
        "CRM implementation client",
        "Marketing automation client",
      ],
      ["Follow-up", "Renewal reminder", "Client check-in"],
    ],
    footer: "Contact details, customer stages and follow-ups in one place.",
  },
  automation: {
    title: "Automation flow",
    sub: "Reduce repetitive admin tasks",
    stats: [
      ["4", "Workflow steps"],
      ["3", "Triggers"],
      ["1", "Connected flow"],
    ],
    cols: [
      ["Trigger", "New enquiry received", "Consultation booked"],
      ["Action", "Send acknowledgement", "Create follow-up task"],
      ["Outcome", "Notify your team", "Prepare next step"],
    ],
    footer: "Example workflows for enquiries, reminders and onboarding.",
  },
};

export function renderCrmDashboardHtml(key: CrmViewKey): string {
  const v = crmViews[key] || crmViews.pipeline;
  const cols = v.cols
    .map((c, i) => {
      const records = c
        .slice(1)
        .map(
          (r, j) =>
            `<div class="crm47-record"><b>${r}</b><small>${j ? "Next step noted" : "Sample entry"}</small><em>${i === 2 ? "Completed" : i === 1 ? "In progress" : "New"}</em></div>`,
        )
        .join("");
      return `<div class="crm47-col"><div class="crm47-colhead"><i></i>${c[0]}</div>${records}</div>`;
    })
    .join("");
  const stats = v.stats
    .map(
      (x) =>
        `<div class="crm47-stat"><b>${x[0]}</b><span>${x[1]}</span><small>Demo data</small></div>`,
    )
    .join("");
  return `<div class="crm47-dashhead"><div><h4>${v.title}</h4><p>${v.sub}</p></div><span class="crm47-pill">Overview</span></div><div class="crm47-stats">${stats}</div><div class="crm47-kanban">${cols}</div><div class="crm47-detail"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${v.footer}</div>`;
}
