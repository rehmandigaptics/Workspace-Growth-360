"use client";

import { useEffect, useRef } from "react";
import { type CrmViewKey, renderCrmDashboardHtml } from "../lib/crmViews";
import { applyV69Phase } from "../lib/v69Journey";
import { withBasePathInHtml } from "../lib/sitePath";

type HtmlPageProps = {
  html: string;
  /** Enable home CRM47 tab preview hydration. */
  withCrmPreview?: boolean;
};

const CRM_KEYS: CrmViewKey[] = [
  "pipeline",
  "booking",
  "members",
  "automation",
];

/**
 * Renders ported marketing HTML and wires interactive demos:
 * - .crm47-tab (home) when withCrmPreview
 * - .v69-phase (CRM page journey) — same behavior as crm.html script
 */
export default function HtmlPage({
  html,
  withCrmPreview = false,
}: HtmlPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const content = withBasePathInHtml(html);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    if (withCrmPreview) {
      const panel = root.querySelector<HTMLElement>("#crm47-preview");
      if (panel) {
        const draw = (key: string) => {
          const viewKey = (CRM_KEYS.includes(key as CrmViewKey)
            ? key
            : "pipeline") as CrmViewKey;
          panel.innerHTML = renderCrmDashboardHtml(viewKey);
        };

        const onCrm47Click = (event: Event) => {
          const target =
            event.target instanceof Element ? event.target : null;
          const btn = target?.closest(".crm47-tab") as HTMLElement | null;
          if (!btn || !root.contains(btn)) return;

          root.querySelectorAll(".crm47-tab").forEach((el) => {
            el.setAttribute("aria-selected", String(el === btn));
          });
          draw(btn.getAttribute("data-view") || "pipeline");
        };

        root.addEventListener("click", onCrm47Click);
        draw("pipeline");
        cleanups.push(() => root.removeEventListener("click", onCrm47Click));
      }
    }

    // V69 customer-journey tabs (crm.html)
    const journey = root.querySelector(".v69-journey");
    if (journey) {
      const onV69Click = (event: Event) => {
        const target =
          event.target instanceof Element ? event.target : null;
        const btn = target?.closest(".v69-phase") as HTMLElement | null;
        if (!btn || !journey.contains(btn)) return;
        const phase = Number(btn.dataset.phase);
        if (Number.isNaN(phase)) return;
        applyV69Phase(journey, phase);
      };

      journey.addEventListener("click", onV69Click);
      applyV69Phase(journey, 0);
      cleanups.push(() => journey.removeEventListener("click", onV69Click));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [withCrmPreview, content]);

  return (
    <div
      ref={rootRef}
      className="wg-html-page"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
