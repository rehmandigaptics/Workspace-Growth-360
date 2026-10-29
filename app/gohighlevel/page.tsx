import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/gohighlevel";

export const metadata: Metadata = { title, description };

export default function GoHighLevelPage() {
  return <HtmlPage html={html} />;
}
