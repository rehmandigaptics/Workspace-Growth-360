import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/n8n-automation";

export const metadata: Metadata = { title, description };

export default function N8nAutomationPage() {
  return <HtmlPage html={html} />;
}
