"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.__wgLenis?.scroll ?? window.scrollY;
      setVisible(y > 400);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const lenis = window.__wgLenis;
    lenis?.on("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis?.off("scroll", onScroll);
    };
  }, []);

  return (
    <button
      aria-label="Back to top"
      className={`v41-back-top${visible ? " is-visible" : ""}`}
      title="Back to top"
      type="button"
      onClick={() => {
        const lenis = window.__wgLenis;
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.15 });
          return;
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <span>Back to top</span>
      <svg
        aria-hidden="true"
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="18"
      >
        <path d="M12 19V5m-7 7 7-7 7 7" />
      </svg>
    </button>
  );
}
