# HTML/Bootstrap → Next.js Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port all 13 Workspace Growth 360 HTML/Bootstrap pages into the existing Next.js App Router app with visual and behavioral parity.

**Architecture:** Faithful page port — shared `Header`/`Footer` in root layout; Bootstrap + existing CSS; page bodies as JSX converted from HTML; client components only for nav, CRM preview tabs, contact mailto form, and back-to-top.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Bootstrap 5.3, Bootstrap Icons, existing `original.css` / `inner.css`, Vitest for pure helper tests.

## Global Constraints

- Keep Bootstrap 5 + `original.css` / `inner.css`; do not restyle with Tailwind for page UI
- Port all 13 routes in this plan (full site parity)
- Contact form is client-only mailto to `grow@360growthlab.com` (no API/server action)
- Target app: `workspace-growth-360/`
- Source of truth for markup/content: `../Workspace-Growth-360-html/`
- Rewrite every internal `*.html` href to Next paths (`index.html` → `/`, `services.html` → `/services`, etc.)
- Prefer `/assets/images/...` under `public/` so CSS and markup paths keep working
- Use React SVG attribute casing (`viewBox`, `strokeWidth`, `strokeLinecap`, `strokeLinejoin`, `className`, `htmlFor`)
- Do not use `includes.js` or CDN Bootstrap/font CSS in the final app
- Commit after each task; do not commit secrets

## HTML → JSX conversion checklist (use on every page task)

Apply mechanically when converting each HTML file’s `<main>` (or body content between header/footer mounts):

1. Copy markup from `Workspace-Growth-360-html/<page>.html` — content inside `<main class="inner-page...">` or home’s main sections (exclude `#site-header`, `#site-footer`, and trailing scripts).
2. Replace `class=` → `className=`, `for=` → `htmlFor=`.
3. Self-close void tags: `<img ... />`, `<input ... />`, `<br />`, `<hr />`, `<source ... />`.
4. Fix SVG: `viewbox` → `viewBox`, `stroke-width` → `strokeWidth`, `stroke-linecap` → `strokeLinecap`, `stroke-linejoin` → `strokeLinejoin`, `fill-rule` → `fillRule`, `clip-rule` → `clipRule`.
5. Replace internal anchors:
   - `href="index.html"` → `href="/"` (use `Link` from `next/link` for internal nav)
   - `href="about.html"` → `/about`, `services.html` → `/services`, `crm.html` → `/crm`, `lead-generation.html` → `/lead-generation`, `n8n-automation.html` → `/n8n-automation`, `gohighlevel.html` → `/gohighlevel`, `features.html` → `/features`, `integrations.html` → `/integrations`, `pricing.html` → `/pricing`, `how-it-works.html` → `/how-it-works`, `contact.html` → `/contact`, `workspaces.html` → `/workspaces`
6. Image `src="assets/..."` → `src="/assets/..."` (leading slash). Keep `<img>` (not `next/image`) unless layout is verified safe.
7. Remove inline `<script>` blocks; wire behavior via shared components (`CrmPreview`, `ContactForm`) instead.
8. Export `metadata` from the page using that HTML file’s `<title>` and `<meta name="description">`.
9. On home only: replace `#crm47-preview` empty div + tabs with `<CrmPreview />`. On contact: replace `#enquiry-form` form with `<ContactForm />`.

## File structure

| Path | Responsibility |
|------|----------------|
| `styles/original.css` | Copied site CSS |
| `styles/inner.css` | Copied inner-page CSS |
| `public/assets/images/**` | All site images |
| `app/layout.tsx` | Fonts, CSS imports, Header, Footer, BootstrapClient |
| `app/globals.css` | Minimal reset; stop Tailwind from overriding site look |
| `app/page.tsx` + `app/<route>/page.tsx` | One page per HTML file |
| `components/Header.tsx` | Client nav |
| `components/Footer.tsx` | Footer markup + year |
| `components/BackToTop.tsx` | Client scroll button |
| `components/BootstrapClient.tsx` | Bootstrap JS init |
| `components/CrmPreview.tsx` | CRM tab preview |
| `components/ContactForm.tsx` | Mailto enquiry form |
| `lib/crmViews.ts` | Pure CRM preview data + HTML builder helpers |
| `lib/mailtoEnquiry.ts` | Pure mailto subject/body builder |
| `lib/mailtoEnquiry.test.ts` | Vitest tests |
| `lib/crmViews.test.ts` | Vitest tests |

---

### Task 1: Assets, CSS, dependencies, and root layout shell

**Files:**
- Create: `styles/original.css`, `styles/inner.css` (copies)
- Create: `public/assets/images/**` (copy tree)
- Modify: `package.json` (add `bootstrap-icons`, `vitest`)
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `vitest.config.ts`

**Interfaces:**
- Consumes: none
- Produces: Global CSS + fonts + empty layout children slot ready for Header/Footer in Task 2; `npm test` script runs Vitest

- [ ] **Step 1: Copy CSS and images**

From repo root `workspace-growth-360/`:

```powershell
New-Item -ItemType Directory -Force -Path styles, public\assets\images | Out-Null
Copy-Item ..\Workspace-Growth-360-html\assets\css\original.css styles\original.css -Force
Copy-Item ..\Workspace-Growth-360-html\assets\css\inner.css styles\inner.css -Force
Copy-Item ..\Workspace-Growth-360-html\assets\images\* public\assets\images\ -Recurse -Force
```

Expected: `styles/original.css`, `styles/inner.css`, and `public/assets/images/generated/` exist with webp assets and `360growthlab-logo.png`.

- [ ] **Step 2: Install bootstrap-icons and vitest**

```bash
npm install bootstrap-icons
npm install -D vitest
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Add Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 4: Replace `app/globals.css`**

Replace file contents with:

```css
/* Site styles come from Bootstrap + styles/original.css + styles/inner.css.
   Keep this file free of Tailwind theme overrides that fight the marketing CSS. */

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
}
```

- [ ] **Step 5: Rewrite `app/layout.tsx` shell (no Header/Footer yet)**

```tsx
import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/original.css";
import "../styles/inner.css";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "CRM & Automation Services | Workspace Growth 360",
  description:
    "Workspace Growth 360 provides CRM implementation, lead generation, GoHighLevel and n8n automation services for growing businesses.",
  other: {
    "theme-color": "#071830",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Smoke-check CSS loads**

```bash
npm run build
```

Expected: Build succeeds (default `app/page.tsx` may still be Create Next App stub). If font or CSS import paths fail, fix paths before continuing.

- [ ] **Step 7: Commit**

```bash
git add styles public/assets package.json package-lock.json vitest.config.ts app/globals.css app/layout.tsx
git commit -m "chore: add site assets, CSS, fonts, and Vitest for Next port"
```

---

### Task 2: Header, Footer, BackToTop, BootstrapClient

**Files:**
- Create: `components/BootstrapClient.tsx`
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Create: `components/BackToTop.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: Next `Link`, `usePathname`, Bootstrap JS from `bootstrap`
- Produces:
  - `export default function Header(): JSX.Element`
  - `export default function Footer(): JSX.Element`
  - `export default function BackToTop(): JSX.Element`
  - `export default function BootstrapClient(): null`
  - Layout renders Header above children, Footer + BackToTop below

- [ ] **Step 1: Create `components/BootstrapClient.tsx`**

```tsx
"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    void import("bootstrap");
  }, []);
  return null;
}
```

- [ ] **Step 2: Create `components/BackToTop.tsx`**

```tsx
"use client";

export default function BackToTop() {
  return (
    <button
      aria-label="Back to top"
      className="v41-back-top"
      title="Back to top"
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
```

- [ ] **Step 3: Create `components/Footer.tsx`**

Port `Workspace-Growth-360-html/includes/footer.html` to JSX:

- Use `Link` for internal hrefs per conversion checklist
- Logo image: `src="/assets/images/360growthlab-logo.png"`
- Year: `<span>{new Date().getFullYear()}</span>` instead of `#year` script
- Do **not** include the back-to-top button here (handled by `BackToTop`)
- Fix all SVG attributes for React

- [ ] **Step 4: Create `components/Header.tsx`**

Port `Workspace-Growth-360-html/includes/header.html` to a client component:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const serviceLinks = [
  { href: "/services", label: "CRM & Sales Systems", icon: "bi-buildings" },
  { href: "/crm", label: "CRM Solutions", icon: "bi-kanban" },
  { href: "/lead-generation", label: "Lead Generation", icon: "bi-bullseye" },
  { href: "/n8n-automation", label: "n8n Automation", icon: "bi-diagram-3" },
  { href: "/gohighlevel", label: "GoHighLevel (GHL)", icon: "bi-lightning-charge" },
] as const;

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/features", label: "Features" },
  { href: "/integrations", label: "Integrations" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact Us" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="nav-shell">
      <div className="container">
        <nav aria-label="Main navigation" className="navbar navbar-expand-lg nav-panel">
          <Link className="navbar-brand" href="/">
            <span className="monogram">W</span>
            <span>
              WORKSPACE
              <br />
              GROWTH 360
            </span>
          </Link>
          <button
            aria-controls="navMenu"
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`collapse navbar-collapse${open ? " show" : ""}`} id="navMenu">
            <ul className="navbar-nav mx-auto align-items-lg-center">
              {mainLinks.slice(0, 2).map((l) => (
                <li className="nav-item" key={l.href}>
                  <Link className={`nav-link${isActive(l.href) ? " active" : ""}`} href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="nav-item dropdown wg-nav-services">
                <button
                  aria-expanded={servicesOpen}
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Services
                </button>
                <ul className={`dropdown-menu wg-nav-dropdown${servicesOpen ? " show" : ""}`}>
                  {serviceLinks.map((l) => (
                    <li key={l.href}>
                      <Link className="dropdown-item" href={l.href} onClick={() => setServicesOpen(false)}>
                        <i aria-hidden="true" className={`bi ${l.icon}`} /> {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {mainLinks.slice(2).map((l) => (
                <li className="nav-item" key={l.href}>
                  <Link className={`nav-link${isActive(l.href) ? " active" : ""}`} href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="pill-btn wg-ref-btn" href="/contact">
              <span className="wg-ref-btn-label">Book a Consultation</span>
              <span aria-hidden="true" className="wg-ref-btn-circle">
                <svg fill="none" height="19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" viewBox="0 0 24 24" width="19">
                  <path d="M5 19 19 5M8 5h11v11" />
                </svg>
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
```

Note: Match visual classes from HTML; adjust dropdown markup if CSS expects `.dropdown-toggle` on an `<a>` — keep Bootstrap dropdown classes and React state `show` class so it works without relying solely on Bootstrap Dropdown JS.

- [ ] **Step 5: Wire layout**

Update `app/layout.tsx` body to:

```tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import BootstrapClient from "../components/BootstrapClient";

// inside return:
<body>
  <BootstrapClient />
  <Header />
  {children}
  <Footer />
  <BackToTop />
</body>
```

- [ ] **Step 6: Manual check**

```bash
npm run dev
```

Open `http://localhost:3000` — Header and Footer should appear (page body still stub). Toggle mobile menu; click a nav link and confirm menu closes.

- [ ] **Step 7: Commit**

```bash
git add components app/layout.tsx
git commit -m "feat: add shared Header, Footer, and Bootstrap client"
```

---

### Task 3: CRM preview helpers + `CrmPreview`

**Files:**
- Create: `lib/crmViews.ts`
- Create: `lib/crmViews.test.ts`
- Create: `components/CrmPreview.tsx`

**Interfaces:**
- Consumes: none
- Produces:
  - `export type CrmViewKey = "pipeline" | "booking" | "members" | "automation"`
  - `export const crmViews: Record<CrmViewKey, CrmViewData>`
  - `export function renderCrmDashboardHtml(key: CrmViewKey): string` — same HTML structure as `crm-home.js` `draw()`
  - `export default function CrmPreview(): JSX.Element`

- [ ] **Step 1: Write failing tests `lib/crmViews.test.ts`**

```ts
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
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test
```

Expected: FAIL — cannot find module `./crmViews` or exports missing.

- [ ] **Step 3: Implement `lib/crmViews.ts`**

Port view data and `draw()` HTML from `Workspace-Growth-360-html/assets/js/crm-home.js` into typed TypeScript. Export `renderCrmDashboardHtml(key)` returning the same HTML string structure (kanban columns, stats, footer).

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test
```

Expected: PASS for `crmViews.test.ts`.

- [ ] **Step 5: Implement `components/CrmPreview.tsx`**

```tsx
"use client";

import { useMemo, useState } from "react";
import { type CrmViewKey, renderCrmDashboardHtml } from "../lib/crmViews";

const tabs: { key: CrmViewKey; label: string; iconPath: string }[] = [
  {
    key: "pipeline",
    label: "Leads & pipeline",
    iconPath: "M9 4v16m6-16v16", // keep full SVG paths from HTML in real file
  },
  // booking, members, automation — copy SVG markup from index.html crm47-tab buttons
];

export default function CrmPreview() {
  const [view, setView] = useState<CrmViewKey>("pipeline");
  const html = useMemo(() => renderCrmDashboardHtml(view), [view]);

  return (
    <>
      {/* Parent page still owns .crm47-left copy; this component owns tabs + preview panel.
          Prefer embedding tabs+preview together matching HTML structure around crm47-tabs and crm47-browser. */}
      <div aria-label="CRM features" className="crm47-tabs" role="tablist">
        {/* map tabs: button role=tab, aria-selected, onClick setView */}
      </div>
      <div className="crm47-right">
        <div aria-live="polite" className="crm47-browser">
          <div className="crm47-browserbar">
            <span className="crm47-dots">
              <i /><i /><i />
            </span>
            <span>WORKSPACE GROWTH 360 / CRM PREVIEW</span>
            <span className="crm47-status">Sample view</span>
          </div>
          <div
            className="crm47-dashboard"
            id="crm47-preview"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        {/* crm47-below points: copy from HTML */}
      </div>
    </>
  );
}
```

**Important:** Match the HTML structure so CSS grid for `.crm47-shell` still works. If splitting tabs from the right column breaks layout, implement `CrmPreview` as the entire `.crm47-shell` interactive region (tabs + browser + below points) and keep static left column in the page — OR port the full CRM section as one client component. Prefer **one client `CrmPreview` wrapping from `.crm47-tabs` through `.crm47-below`** while leaving `.crm47-left` heading/CTA in the server page **only if** DOM order matches CSS. If CSS expects tabs inside `.crm47-left`, put tabs in the left column in the page and pass `view` via lifting state in a thin `Crm47Section` client wrapper around the whole `.crm47-shell`.

Recommended shape that preserves CSS:

```tsx
"use client";
// Crm47Section wraps entire .crm47-shell contents (left + right) ported from HTML,
// with tab state and dangerouslySetInnerHTML preview.
export default function Crm47Section() { /* full shell from index.html */ }
```

Use `Crm47Section` as the component name if that is clearer; export default from `components/CrmPreview.tsx` still OK if file documents it wraps the shell.

- [ ] **Step 6: Commit**

```bash
git add lib/crmViews.ts lib/crmViews.test.ts components/CrmPreview.tsx
git commit -m "feat: add CRM preview component with tested view renderer"
```

---

### Task 4: Mailto helper + `ContactForm`

**Files:**
- Create: `lib/mailtoEnquiry.ts`
- Create: `lib/mailtoEnquiry.test.ts`
- Create: `components/ContactForm.tsx`

**Interfaces:**
- Consumes: none
- Produces:
  - `export type EnquiryFields = { name: string; email: string; phone: string; service: string; message: string }`
  - `export function buildEnquiryMailto(fields: EnquiryFields): string` — returns full `mailto:grow@360growthlab.com?subject=...&body=...`
  - `export default function ContactForm(): JSX.Element`

- [ ] **Step 1: Write failing tests**

Create `lib/mailtoEnquiry.test.ts`:

```ts
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
    expect(href).toContain(encodeURIComponent("Workspace Growth 360 enquiry — CRM Solutions"));
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
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test
```

Expected: FAIL on missing `mailtoEnquiry` module.

- [ ] **Step 3: Implement `lib/mailtoEnquiry.ts`**

```ts
export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export function buildEnquiryMailto(fields: EnquiryFields): string {
  const subject = `Workspace Growth 360 enquiry — ${fields.service || "General"}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "-"}`,
    `Service: ${fields.service}`,
    "",
    "Message:",
    fields.message,
  ].join("\n");
  return `mailto:grow@360growthlab.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test
```

Expected: All tests PASS.

- [ ] **Step 5: Implement `components/ContactForm.tsx`**

Port the form markup from `contact.html` (`#enquiry-form`):

- `"use client"`
- Controlled or uncontrolled inputs with the same fields/ids/classes
- `onSubmit`: `preventDefault`, read values, `window.location.href = buildEnquiryMailto(...)`
- Keep the demo note paragraph about opening the email app
- Keep service `<select>` options identical to HTML

- [ ] **Step 6: Commit**

```bash
git add lib/mailtoEnquiry.ts lib/mailtoEnquiry.test.ts components/ContactForm.tsx
git commit -m "feat: add contact mailto form with tested enquiry builder"
```

---

### Task 5: Home page (`/`)

**Files:**
- Modify: `app/page.tsx`
- Remove unused Create Next App assets from `public/` only if nothing references them (`next.svg`, etc.) — optional cleanup

**Interfaces:**
- Consumes: `CrmPreview` / `Crm47Section` from Task 3
- Produces: Home route with metadata from `index.html`

- [ ] **Step 1: Replace `app/page.tsx`**

Convert `Workspace-Growth-360-html/index.html` main content using the conversion checklist.

```tsx
import type { Metadata } from "next";
import CrmPreview from "../components/CrmPreview";

export const metadata: Metadata = {
  title: "CRM & Automation Services | Workspace Growth 360",
  description:
    "Workspace Growth 360 provides CRM implementation, lead generation, GoHighLevel and n8n automation services for growing businesses.",
};

export default function HomePage() {
  return (
    <main className="inner-page">
      {/* Port all sections from index.html */}
      {/* Where CRM shell was: render <CrmPreview /> (or Crm47Section) */}
    </main>
  );
}
```

Ensure nested `<main>` from HTML is flattened to a single `<main>`.

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Check `/`: hero, trust strip, solutions cards, CRM tabs switching preview, services cards, footer. Compare quickly to opening `Workspace-Growth-360-html/index.html` in a browser.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: port home page from HTML to Next.js"
```

---

### Task 6: Core marketing pages

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/services/page.tsx`
- Create: `app/features/page.tsx`
- Create: `app/pricing/page.tsx`

**Interfaces:**
- Consumes: conversion checklist; shared layout Header/Footer
- Produces: `/about`, `/services`, `/features`, `/pricing` with correct metadata

| Source | Route | Title (from HTML `<title>`) |
|--------|-------|-----------------------------|
| `about.html` | `/about` | use exact title string from file |
| `services.html` | `/services` | use exact title string from file |
| `features.html` | `/features` | use exact title string from file |
| `pricing.html` | `/pricing` | use exact title string from file |

- [ ] **Step 1: Extract metadata from each HTML head**

For each file, copy `title` and `meta name="description"` content attributes into `export const metadata`.

- [ ] **Step 2: Create each `page.tsx`**

For each page: convert `<main>` with the checklist; wrap in `export default function ...Page()`.

- [ ] **Step 3: Verify routes**

Visit `/about`, `/services`, `/features`, `/pricing` in `next dev`. Confirm nav active states and no broken image paths.

- [ ] **Step 4: Commit**

```bash
git add app/about app/services app/features app/pricing
git commit -m "feat: port about, services, features, and pricing pages"
```

---

### Task 7: Service detail pages

**Files:**
- Create: `app/crm/page.tsx`
- Create: `app/lead-generation/page.tsx`
- Create: `app/n8n-automation/page.tsx`
- Create: `app/gohighlevel/page.tsx`

**Interfaces:**
- Consumes: conversion checklist
- Produces: four service routes

| Source | Route |
|--------|-------|
| `crm.html` | `/crm` |
| `lead-generation.html` | `/lead-generation` |
| `n8n-automation.html` | `/n8n-automation` |
| `gohighlevel.html` | `/gohighlevel` |

- [ ] **Step 1: Port each page with checklist + metadata from HTML head**

- [ ] **Step 2: Verify**

Open all four routes; confirm Services dropdown links resolve; images under `/assets/images/generated/` load.

- [ ] **Step 3: Commit**

```bash
git add app/crm app/lead-generation app/n8n-automation app/gohighlevel
git commit -m "feat: port CRM, lead generation, n8n, and GoHighLevel pages"
```

---

### Task 8: Remaining pages (integrations, how-it-works, contact, workspaces)

**Files:**
- Create: `app/integrations/page.tsx`
- Create: `app/how-it-works/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `app/workspaces/page.tsx`

**Interfaces:**
- Consumes: `ContactForm` on contact page
- Produces: remaining four routes

- [ ] **Step 1: Port `integrations.html`, `how-it-works.html`, `workspaces.html`**

Use conversion checklist + metadata.

- [ ] **Step 2: Port `contact.html`**

- Convert page chrome (hero, journey, FAQ) as server JSX
- Replace the `#enquiry-form` block with `<ContactForm />`
- Remove the inline mailto `<script>` from HTML (logic lives in `ContactForm`)

```tsx
import type { Metadata } from "next";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Discuss Your CRM Project | Workspace Growth 360",
  description:
    "Premium workspaces, coworking CRM, lead generation and business automation solutions from Workspace Growth 360.",
};

export default function ContactPage() {
  return (
    <main className="inner-page v54-inner v54-contact">
      {/* hero + surrounding sections from contact.html */}
      {/* inside contact-panel where form was: */}
      <ContactForm />
      {/* journey + FAQ sections */}
    </main>
  );
}
```

Preserve `contact-panel` / `contact-card` structure so CSS layout holds.

- [ ] **Step 3: Verify contact mailto**

Fill the form and submit — OS email client should open with prefilled subject/body to `grow@360growthlab.com`.

- [ ] **Step 4: Commit**

```bash
git add app/integrations app/how-it-works app/contact app/workspaces
git commit -m "feat: port integrations, how-it-works, contact, and workspaces pages"
```

---

### Task 9: Final verification and cleanup

**Files:**
- Modify: any pages with broken links/images found in QA
- Optionally delete unused Create Next App stub assets

**Interfaces:**
- Consumes: full site
- Produces: green production build + checklist sign-off

- [ ] **Step 1: Run unit tests**

```bash
npm test
```

Expected: All Vitest tests PASS.

- [ ] **Step 2: Production build**

```bash
npm run build
```

Expected: Compiled successfully; all 13 routes listed in the build output.

- [ ] **Step 3: Route checklist**

With `npm run start` or `npm run dev`, confirm:

| Route | Check |
|-------|--------|
| `/` | Hero + CRM tabs update preview |
| `/about` | Renders |
| `/services` | Renders |
| `/crm` | Renders |
| `/lead-generation` | Renders |
| `/n8n-automation` | Renders |
| `/gohighlevel` | Renders |
| `/features` | Renders |
| `/integrations` | Renders |
| `/pricing` | Renders |
| `/how-it-works` | Renders |
| `/contact` | Form mailto works |
| `/workspaces` | Renders |

Also: mobile nav open/close; Services dropdown; footer year; back-to-top; no `*.html` links left in components/pages.

```powershell
# From workspace-growth-360 — should return no matches in app/ and components/
Select-String -Path app,components -Pattern '\.html' -Recurse
```

Expected: no internal `*.html` href matches (mailto and external URLs OK).

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: polish Next port after full-site verification"
```

(Skip empty commit if working tree clean.)

---

## Spec coverage self-review

| Spec requirement | Task |
|------------------|------|
| Keep Bootstrap + original/inner CSS | Task 1 |
| All 13 pages | Tasks 5–8 |
| Static mailto contact | Task 4, 8 |
| Faithful page port | Tasks 5–8 + checklist |
| Shared Header/Footer in layout | Task 2 |
| Assets under `public/assets` | Task 1 |
| CrmPreview from crm-home.js | Task 3 |
| Bootstrap JS / React nav | Task 2 |
| Link rewriting | Checklist + Task 9 grep |
| `next build` verification | Task 9 |
| No Tailwind restyle of pages | Task 1 globals.css |

## Placeholder / consistency notes

- `CrmPreview` vs `Crm47Section`: Task 3 allows wrapping the full `.crm47-shell` if CSS requires it; Home (Task 5) must import the same default export from `components/CrmPreview.tsx`.
- Header dropdown uses React `show` class; BootstrapClient still loads for any other Bootstrap components on pages.
- Page JSX bodies are converted from HTML sources at implementation time (too large to inline here); the checklist is normative.
