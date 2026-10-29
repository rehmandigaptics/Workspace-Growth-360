import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/pricing";

export const metadata: Metadata = { title, description };

export default function PricingPage() {
  return <HtmlPage html={html} />;
}
