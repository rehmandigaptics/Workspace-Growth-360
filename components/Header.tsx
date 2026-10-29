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

// Features + Integrations pages remain live; links hidden for client demo.
const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
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
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

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
          <div
            className={`collapse navbar-collapse${open ? " show" : ""}`}
            id="navMenu"
          >
            <ul className="navbar-nav mx-auto align-items-lg-center">
              {mainLinks.slice(0, 2).map((l) => (
                <li className="nav-item" key={l.href}>
                  <Link
                    className={`nav-link${isActive(l.href) ? " active" : ""}`}
                    href={l.href}
                  >
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
                <ul
                  className={`dropdown-menu wg-nav-dropdown${servicesOpen ? " show" : ""}`}
                >
                  {serviceLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        className="dropdown-item"
                        href={l.href}
                        onClick={() => setServicesOpen(false)}
                      >
                        <i aria-hidden="true" className={`bi ${l.icon}`} />{" "}
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {mainLinks.slice(2).map((l) => (
                <li className="nav-item" key={l.href}>
                  <Link
                    className={`nav-link${isActive(l.href) ? " active" : ""}`}
                    href={l.href}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="pill-btn wg-ref-btn" href="/contact">
              <span className="wg-ref-btn-label">Book a Consultation</span>
              <span aria-hidden="true" className="wg-ref-btn-circle">
                <svg
                  fill="none"
                  height="19"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  width="19"
                >
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
