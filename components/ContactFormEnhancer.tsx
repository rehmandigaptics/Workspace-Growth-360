"use client";

import { useEffect } from "react";
import { buildEnquiryMailto } from "../lib/mailtoEnquiry";

/** Attaches mailto submit behavior to the ported #enquiry-form without breaking its layout parent. */
export default function ContactFormEnhancer() {
  useEffect(() => {
    const form = document.getElementById("enquiry-form") as HTMLFormElement | null;
    if (!form) return;

    const onSubmit = (event: Event) => {
      event.preventDefault();
      const data = new FormData(form);
      window.location.href = buildEnquiryMailto({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        service: String(data.get("service") || ""),
        message: String(data.get("message") || ""),
      });
    };

    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, []);

  return null;
}
