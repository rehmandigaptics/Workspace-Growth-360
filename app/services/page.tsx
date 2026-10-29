import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/services";

export const metadata: Metadata = { title, description };

export default function ServicesPage() {
  return <HtmlPage html={html} />;
}
