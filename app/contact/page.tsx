import type { Metadata } from "next";
import HtmlPage from "../../components/HtmlPage";
import ContactFormEnhancer from "../../components/ContactFormEnhancer";
import { description, html, title } from "../../content/contact";

export const metadata: Metadata = { title, description };

export default function ContactPage() {
  return (
    <>
      <HtmlPage html={html} />
      <ContactFormEnhancer />
    </>
  );
}
