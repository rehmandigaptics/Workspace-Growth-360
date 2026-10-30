import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import BootstrapClient from "../components/BootstrapClient";
import SmoothScroll from "../components/SmoothScroll";
import { sitePath } from "../lib/sitePath";

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
    <html
      lang="en"
      className={`${dmSans.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link href={sitePath("/assets/css/original.css")} rel="stylesheet" />
        <link href={sitePath("/assets/css/inner.css")} rel="stylesheet" />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla) inject body attrs */}
      <body suppressHydrationWarning>
        <BootstrapClient />
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
