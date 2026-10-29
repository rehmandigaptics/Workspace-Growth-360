import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/lead-generation";

export const metadata: Metadata = { title, description };

export default function LeadGenerationPage() {
  return <HtmlPage html={html} />;
}
