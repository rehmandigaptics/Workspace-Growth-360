import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import { description, html, title } from "../../content/workspaces";

export const metadata: Metadata = { title, description };

export default function WorkspacesPage() {
  return <HtmlPage html={html} />;
}
