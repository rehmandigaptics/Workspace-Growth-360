"use client";

import { useEffect } from "react";
import {
  type CrmViewKey,
  renderCrmDashboardHtml,
} from "../lib/crmViews";

/** Hydrates the CRM marketing preview tabs inside ported HTML. */
export default function CrmPreview() {
  useEffect(() => {
    const panel = document.getElementById("crm47-preview");
    if (!panel) return;

    const draw = (key: string) => {
      const viewKey = (key || "pipeline") as CrmViewKey;
      panel.innerHTML = renderCrmDashboardHtml(
        ["pipeline", "booking", "members", "automation"].includes(viewKey)
          ? viewKey
          : "pipeline",
      );
    };

    const tabs = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".crm47-tab"),
    );

    const onClick = (event: Event) => {
      const btn = event.currentTarget as HTMLButtonElement;
      tabs.forEach((b) =>
        b.setAttribute("aria-selected", String(b === btn)),
      );
      draw(btn.dataset.view || "pipeline");
    };

    tabs.forEach((btn) => btn.addEventListener("click", onClick));
    draw("pipeline");

    return () => {
      tabs.forEach((btn) => btn.removeEventListener("click", onClick));
    };
  }, []);

  return null;
}
