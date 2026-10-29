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

