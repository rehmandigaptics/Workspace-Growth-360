import type { Metadata } from "next";
import Script from "next/script";
import HtmlPage from "../../components/HtmlPage";
import { withContactEmbedForm } from "../../components/ContactEmbedForm";
import { description, html, title } from "../../content/contact";

export const metadata: Metadata = { title, description };

export default function ContactPage() {
  return (
    <>
      <HtmlPage html={withContactEmbedForm(html)} />
      <Script
        src="https://links.360growthlab.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </>
  );
}
