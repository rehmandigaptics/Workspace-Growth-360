# HTML/Bootstrap → Next.js Conversion Design

**Date:** 2026-10-29  
**Product:** Workspace Growth 360 marketing site  
**Source:** `Workspace-Growth-360-html/`  
**Target:** `workspace-growth-360/` (Next.js App Router)

## Goal

Convert the existing Bootstrap HTML site into Next.js with **visual and content parity** across all pages. Keep Bootstrap and the current CSS; do not redesign.

## Decisions (locked)

| Topic | Choice |
|--------|--------|
| Styling | Keep Bootstrap 5 + `original.css` / `inner.css` |
| Scope | All 13 pages in one pass |
| Contact form | Static / client-only (`mailto:` prefill, same as HTML) |
| Conversion style | Faithful page port (large page JSX; minimal shared components) |
| Target app | Existing `workspace-growth-360` scaffold |

## Out of scope

- Redesign or Tailwind restyle of pages
- CMS, database, or server-side form submission
- Automated visual regression tests
- Deep section-component refactor of every block

## Architecture

Build inside `workspace-growth-360` (App Router + TypeScript).

### Routes

One route per HTML page:

| HTML file | Next route |
|-----------|------------|
| `index.html` | `/` (`app/page.tsx`) |
| `about.html` | `/about` |
| `services.html` | `/services` |
| `crm.html` | `/crm` |
| `lead-generation.html` | `/lead-generation` |
| `n8n-automation.html` | `/n8n-automation` |
| `gohighlevel.html` | `/gohighlevel` |
| `features.html` | `/features` |
| `integrations.html` | `/integrations` |
| `pricing.html` | `/pricing` |
| `how-it-works.html` | `/how-it-works` |
| `contact.html` | `/contact` |
| `workspaces.html` | `/workspaces` |

### Layout and global assets

- `app/layout.tsx` loads:
  - Fonts: DM Sans and Manrope (match HTML Google Fonts usage)
  - Bootstrap CSS (npm package already present)
  - Bootstrap Icons
  - `original.css` and `inner.css` (copied from HTML `assets/css/`)
  - Shared `Header` and `Footer`
- Theme color / metadata defaults align with HTML (`#071830`, site name)
- Tailwind remains installed but unused for page styling (avoids fighting Bootstrap)

### Static assets

- Copy `Workspace-Growth-360-html/assets/images/` → `public/assets/images/`
- Prefer public URLs `/assets/images/...` so existing CSS background paths and markup keep working
- Prefer plain `<img>` where CSS sizing is fragile; use `next/image` only when it does not break layout

### Bootstrap JS

- No CDN scripts in production pages
- Small client helper (`BootstrapClient`) to initialize Bootstrap JS, **or** React-controlled collapse/dropdown in `Header` if that is cleaner
- Mobile nav must close on route change

## Components

Minimal shared surface; page bodies stay mostly inline JSX matching the HTML.

| Component | Kind | Responsibility |
|-----------|------|----------------|
| `Header` | Client | Nav, mobile collapse, Services dropdown, active link via `usePathname` |
| `Footer` | Server | Port of `includes/footer.html` |
| `BootstrapClient` | Client | Bootstrap bundle init (if not fully replaced by React nav state) |
| `CrmPreview` | Client | Port of `assets/js/crm-home.js` tab switching + preview panel |
| `ContactForm` | Client | Validation + `mailto:grow@360growthlab.com` with prefilled subject/body |
| Page modules | Mostly server | Markup + `metadata` (`title` / `description` from each HTML `<head>`) |

### Link rewriting

Replace every `*.html` href with the Next path (e.g. `services.html` → `/services`, `index.html` → `/`). Use Next.js `Link` for internal navigation.

## Data flow

- No CMS or database
- Content is hardcoded in page JSX (ported from HTML)
- Interactive pieces hold **local React state only** (Header, CrmPreview, ContactForm)
- No global client store

## Contact form behavior

Match HTML demo behavior:

1. Client validates required fields (name, email, service, message)
2. On submit, prevent default and open `mailto:grow@360growthlab.com` with encoded subject/body
3. Note on the form remains: demo opens email app; does not post to a server

## Error handling and edge cases

- Contact: HTML5 / client validation; no server error path in v1
- Images: copy all generated assets with original filenames
- Nav: collapse menu on navigation; dropdown accessible on desktop and mobile
- SVG attributes: use React casing (`viewBox`, `strokeWidth`, etc.) when converting markup

## Verification

1. `npm run build` succeeds
2. In `next dev`, spot-check all 13 routes
3. Confirm Header dropdown, mobile menu, home CRM tabs, contact `mailto:` flow
4. Visual spot-check Home and one inner page (e.g. Services) against the HTML site

## File / folder expectations (implementation)

```
workspace-growth-360/
  app/
    layout.tsx
    page.tsx                 # home
    about/page.tsx
    services/page.tsx
    crm/page.tsx
    lead-generation/page.tsx
    n8n-automation/page.tsx
    gohighlevel/page.tsx
    features/page.tsx
    integrations/page.tsx
    pricing/page.tsx
    how-it-works/page.tsx
    contact/page.tsx
    workspaces/page.tsx
    globals.css              # may import or defer to site CSS
  components/
    Header.tsx
    Footer.tsx
    BootstrapClient.tsx
    CrmPreview.tsx
    ContactForm.tsx
  public/assets/images/...
  styles/                    # original.css, inner.css (or under app/)
```

## Success criteria

- All 13 routes render with content and styling equivalent to the HTML site
- Shared header/footer work without `includes.js`
- CRM preview tabs and contact mailto behavior work in React
- Production build completes without errors
