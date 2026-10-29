import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/features";

export const metadata: Metadata = { title, description };

export default function FeaturesPage() {
  return <HtmlPage html={html} />;
}
