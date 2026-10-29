export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export function buildEnquiryMailto(fields: EnquiryFields): string {
  const subject = `Workspace Growth 360 enquiry — ${fields.service || "General"}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "-"}`,
    `Service: ${fields.service}`,
    "",
    "Message:",
    fields.message,
  ].join("\n");
  return `mailto:grow@360growthlab.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
