/** Inline GoHighLevel / 360 Growth Lab form embed markup (matches provider snippet). */
export const CONTACT_EMBED_HTML = `<div class="contact-form contact-embed-wrap" id="enquiry-form">
<div class="v89-form-heading">
<span class="v89-eyebrow">LET'S BUILD SOMETHING BETTER</span>
<h3>Tell us about your <em>project.</em></h3>
<p>Share your goals and the services you're interested in. We'll help you explore the next step.</p>
</div>
<iframe
  src="https://links.360growthlab.com/widget/form/h1GzyRuEF7QK5AiZZkGI"
  style="width:100%;height:490px;border:none;border-radius:8px"
  id="inline-h1GzyRuEF7QK5AiZZkGI"
  data-layout="{'id':'INLINE'}"
  data-trigger-type="alwaysShow"
  data-trigger-value=""
  data-activation-type="alwaysActivated"
  data-activation-value=""
  data-deactivation-type="neverDeactivate"
  data-deactivation-value=""
  data-form-name="Prepare Email Inquiry Rehman Ali Form "
  data-height="490"
  data-layout-iframe-id="inline-h1GzyRuEF7QK5AiZZkGI"
  data-form-id="h1GzyRuEF7QK5AiZZkGI"
  data-cookie-consent="true"
  data-cookie-consent-provider="auto"
  title="Prepare Email Inquiry Rehman Ali Form "
></iframe>
</div>`;

export function withContactEmbedForm(html: string): string {
  const replaced = html.replace(
    /<form\b[^>]*\bid=["']enquiry-form["'][\s\S]*?<\/form>/i,
    CONTACT_EMBED_HTML,
  );
  return replaced;
}
