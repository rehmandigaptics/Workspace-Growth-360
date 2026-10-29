import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/about";

export const metadata: Metadata = { title, description };

export default function AboutPage() {
  return <HtmlPage html={html} />;
}
