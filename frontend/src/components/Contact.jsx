import { useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHeader from "./SectionHeader";
import { useReveal } from "../hooks/useReveal";

// 🔑 Paste your IDs here
const SERVICE_ID  = "service_v3e3e0g";
const TEMPLATE_ID = "template_vju6w1m";
const PUBLIC_KEY  = "O2ajQjiW9XRrqY2CS";

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact({ contact }) {
  const r1 = useReveal();
  const r2 = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [serverMsg, setServerMsg] = useState("");

  if (!contact) return null;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setServerMsg("");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setServerMsg("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setServerMsg("Failed to send. Please try again.");
    }
  };

  return (
    <section id="contact">
      <SectionHeader num="06" title="Contact" />
      <div className="contact-inner">
        <div>
          <div className="contact-text reveal" ref={r1}>
            <p>
              I'm actively looking for full-time roles and internships.
              Whether it's a quick question or a job opportunity — my inbox is always open.
            </p>
          </div>
          <div className="contact-links reveal" ref={r1}>
            <a href={`mailto:${contact.email}`} className="contact-link">
              <EmailIcon /> {contact.email}
            </a>
            <a href={`https://${contact.github}`} target="_blank" rel="noreferrer" className="contact-link">
              <GithubIcon /> {contact.github}
            </a>
            <a href={`https://${contact.linkedin}`} target="_blank" rel="noreferrer" className="contact-link">
              <LinkedInIcon /> {contact.linkedin}
            </a>
          </div>
        </div>

        <form className="contact-form reveal" ref={r2} onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              id="name" name="name" type="text"
              placeholder="Your name"
              value={form.name} onChange={handleChange} required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email"
              placeholder="your@email.com"
              value={form.email} onChange={handleChange} required
            />
          </div>
          <div className="input-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message" name="message"
              placeholder="What's on your mind?"
              value={form.message} onChange={handleChange} required
            />
          </div>
          {status === "success" && <div className="form-success">{serverMsg}</div>}
          {status === "error"   && <p className="form-error">{serverMsg}</p>}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "fit-content" }}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}