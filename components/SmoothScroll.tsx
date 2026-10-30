"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

declare global {
  interface Window {
    __wgLenis?: Lenis;
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToHash(lenis: Lenis | undefined, hash: string) {
  if (!hash || hash === "#") return;
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis && !prefersReducedMotion()) {
    lenis.scrollTo(el, { offset: -100, duration: 1.15 });
    return;
  }

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

/** Sitewide smooth scrolling (Lenis) + smooth hash / anchor navigation. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lenis: Lenis | undefined;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({
        autoRaf: true,
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.4,
      });
      window.__wgLenis = lenis;
    }

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const samePath =
        url.pathname.replace(/\/$/, "") ===
        window.location.pathname.replace(/\/$/, "");

      if (samePath && url.hash) {
        event.preventDefault();
        const next = `${window.location.pathname}${window.location.search}${url.hash}`;
        if (window.location.hash !== url.hash) {
          window.history.pushState(null, "", next);
        }
        scrollToHash(lenis, url.hash);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      if (window.__wgLenis === lenis) {
        delete window.__wgLenis;
      }
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    const lenis = window.__wgLenis;
    const id = window.requestAnimationFrame(() => {
      lenis?.resize();
      if (window.location.hash) {
        scrollToHash(lenis, window.location.hash);
      }
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
