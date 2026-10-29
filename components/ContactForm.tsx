"use client";

import { FormEvent, useState } from "react";
import { buildEnquiryMailto } from "../lib/mailtoEnquiry";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = buildEnquiryMailto({
      name,
      email,
      phone,
      service,
      message,
    });
  };

  return (
    <form className="contact-form" id="enquiry-form" onSubmit={onSubmit}>
      <div className="v89-form-heading">
        <span className="v89-eyebrow">LET&apos;S BUILD SOMETHING BETTER</span>
        <h3>
          Tell us about your <em>project.</em>
        </h3>
        <p>
          Share your goals and the services you&apos;re interested in. We&apos;ll
          help you explore the next step.
        </p>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-name">Full name</label>
          <input
            id="cf-name"
            name="name"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="cf-email">Email address</label>
          <input
            id="cf-email"
            name="email"
            placeholder="you@company.com"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-phone">Phone (optional)</label>
          <input
            id="cf-phone"
            name="phone"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="cf-service">Service of interest</label>
          <select
            id="cf-service"
            name="service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Select a service</option>
            <option>CRM &amp; Sales Systems</option>
            <option>CRM Solutions</option>
            <option>Lead Generation</option>
            <option>n8n Automation</option>
            <option>GoHighLevel Services</option>
            <option>Multiple Services</option>
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="cf-message">How can we help?</label>
        <textarea
          id="cf-message"
          name="message"
          placeholder="Tell us a little about your needs"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button className="inner-btn" type="submit">
        <span>Prepare Email Enquiry</span>
        <span className="v89-btn-icon">
          <svg
            aria-hidden="true"
            fill="none"
            height="18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="18"
          >
            <path d="M5 19 19 5M8 5h11v11" />
          </svg>
        </span>
      </button>
      <p className="form-note">
        This demo opens your email app with a prefilled message; it does not
        submit information to a server.
      </p>
    </form>
  );
}
