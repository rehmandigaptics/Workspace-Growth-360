import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/integrations";

export const metadata: Metadata = { title, description };

export default function IntegrationsPage() {
  return <HtmlPage html={html} />;
}
