import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/how-it-works";

export const metadata: Metadata = { title, description };

export default function HowItWorksPage() {
  return <HtmlPage html={html} />;
}
