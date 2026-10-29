import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/crm";

export const metadata: Metadata = { title, description };

export default function CrmPage() {
  return <HtmlPage html={html} />;
}
