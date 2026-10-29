import type { Metadata } from "next";
import HtmlPage from "../components/HtmlPage";
import { description, html, title } from "../content/home";

export const metadata: Metadata = { title, description };

export default function HomePage() {
  return <HtmlPage html={html} withCrmPreview />;
}
