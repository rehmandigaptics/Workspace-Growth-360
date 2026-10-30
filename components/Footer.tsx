import Link from "next/link";
import { sitePath } from "../lib/sitePath";

export default function Footer() {
  // Fixed year avoids Next.js prerender blocking on `new Date()` in the layout.
  const year = 2026;

  return (
    <footer className="footer-v40" id="footer">
      <div className="container">
        <div className="footer-v40-top">
          <div>
            <span className="footer-v40-eyebrow">
              <span className="footer-v40-dot" /> YOUR NEXT STAGE OF GROWTH
              STARTS HERE
            </span>
            <h2>
              Build <em>what&apos;s next</em> for your business.
            </h2>
            <p>
              Find the right CRM, lead generation and automation solutions for
              your business.
            </p>
          </div>
          <Link className="footer-v40-cta" href="/contact">
            Book a Consultation{" "}
            <span className="footer-v40-cta-arrow">
              <svg
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                width="20"
              >
                <path d="M5 19 19 5M8 5h11v11" />
              </svg>
            </span>
          </Link>
        </div>
        <div className="footer-v40-grid">
          <div className="footer-v40-brand">
            <Link className="footer-v40-logo" href="/">
              <span className="footer-v40-mark">W</span>
              <span>
                WORKSPACE
                <br />
                GROWTH 360
              </span>
            </Link>
            <p>
              CRM, lead generation and connected automations designed to support
              business growth.
            </p>
            <div className="footer-v40-location">
              <svg
                fill="none"
                height="17"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                width="17"
              >
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>{" "}
              Oakbrook Terrace, Illinois
            </div>
          </div>
          <nav
            aria-label="Footer explore navigation"
            className="footer-v40-links"
          >
            <h3>EXPLORE</h3>
            <Link href="/">Home</Link>
            <Link href="/services">Our Services</Link>
            <Link href="/about">About Us</Link>
            <Link href="/features">Features &amp; Capabilities</Link>
            <Link href="/integrations">Integrations</Link>
            <Link href="/how-it-works">How It Works</Link>
          </nav>
          <nav
            aria-label="Footer digital solutions"
            className="footer-v40-links"
          >
            <h3>DIGITAL SOLUTIONS</h3>
            <Link href="/crm">CRM Solutions</Link>
            <Link href="/lead-generation">Lead Generation</Link>
            <Link href="/n8n-automation">n8n Automation</Link>
            <Link href="/gohighlevel">GoHighLevel</Link>
          </nav>
          <div className="footer-v40-contact">
            <h3>LET&apos;S CONNECT</h3>
            <p>Better CRM workflows begin with a conversation.</p>
            <a
              className="footer-v40-email"
              href="mailto:grow@360growthlab.com"
            >
              grow@360growthlab.com{" "}
              <svg
                fill="none"
                height="17"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                width="17"
              >
                <path d="M5 19 19 5M8 5h11v11" />
              </svg>
            </a>
            <span className="footer-v40-contact-note">
              CONNECTED SYSTEMS. STRONGER GROWTH.
            </span>
          </div>
        </div>
        <div className="footer-v40-bottom">
          <span>© {year} Workspace Growth 360. Design concept.</span>
          <a
            aria-label="Powered by 360 Growth Lab — visit website"
            className="footer-v41-credit"
            href="https://360growthlab.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="footer-v41-powered">POWERED BY</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="360 Growth Lab logo"
              className="footer-v42-logo"
              height={35}
              loading="lazy"
              src={sitePath("/assets/images/360growthlab-logo.png")}
              width={130}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
