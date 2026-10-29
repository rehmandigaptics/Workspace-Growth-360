export type V69Example = {
  title: string;
  status: string;
  head: string;
  desc: string;
  action: string;
  icon: string;
};

/** Same demo data as crm.html V69 journey script. */
export const v69Examples: V69Example[] = [
  {
    title: "Capture new enquiries",
    status: "NEW ENQUIRY",
    head: "Website enquiry received",
    desc: "A new prospect has reached out through your website.",
    action: "Add to the lead pipeline",
    icon: "bi-inbox",
  },
  {
    title: "Qualify the opportunity",
    status: "IN REVIEW",
    head: "Lead details reviewed",
    desc: "Interest, status and ownership are organized.",
    action: "Assign the next follow-up",
    icon: "bi-filter",
  },
  {
    title: "Follow up with purpose",
    status: "FOLLOW-UP",
    head: "Conversation in progress",
    desc: "Keep reminders and next actions visible.",
    action: "Schedule a timely check-in",
    icon: "bi-send",
  },
  {
    title: "Convert and retain",
    status: "RELATIONSHIP",
    head: "Client relationship started",
    desc: "Keep useful context for future conversations.",
    action: "Maintain the customer record",
    icon: "bi-check-circle",
  },
];

export function applyV69Phase(root: ParentNode, phaseIndex: number) {
  const i = Math.max(0, Math.min(phaseIndex, v69Examples.length - 1));
  const d = v69Examples[i];

  root.querySelectorAll(".v69-phase").forEach((b) => {
    const on = Number((b as HTMLElement).dataset.phase) === i;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", String(on));
  });

  const set = (id: string, val: string) => {
    const el = root.querySelector("#" + id);
    if (el) el.textContent = val;
  };

  set("v69-preview-title", d.title);
  set("v69-preview-status", d.status);
  set("v69-record-head", d.head);
  set("v69-record-desc", d.desc);
  set("v69-preview-action", d.action);
  set("v69-progress-text", `STEP 0${i + 1} OF 04`);
  set("v69-step-num", `0${i + 1}`);

  const icon = root.querySelector("#v69-preview-icon");
  if (icon) icon.className = "bi " + d.icon;

  const fill = root.querySelector<HTMLElement>("#v69-progress-fill");
  if (fill) fill.style.width = `${(i + 1) * 25}%`;
}
