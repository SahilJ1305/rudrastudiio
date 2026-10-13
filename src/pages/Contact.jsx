import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Send,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import PageHero from "../components/PageHero";
import { categories } from "../data/categories";
import { studio, whatsappUrl, buildEnquiryMessage, sendEnquiryToWhatsApp } from "../data/studio";
import "./Contact.css";

const faqs = [
  {
    q: "How do I book Rudra Studio for my event or project?",
    a: "Send us an enquiry using the form on this page or the Book a Shoot button. It opens WhatsApp with all your details filled in, and we reply to confirm availability and share a customized quotation."
  },
  {
    q: "Do you cover photography and videography together?",
    a: "Yes. Photography and videography solutions are available under one roof, so one team can cover your wedding, event or business project from start to finish."
  },
  {
    q: "Do you work outside Pune?",
    a: "Yes. We offer services across India for large weddings and events. Tell us the city and dates in your enquiry and we will confirm availability."
  },
  {
    q: "Do you offer packages?",
    a: "We create customized packages for different requirements, whether it is a wedding, a kids or maternity shoot, a corporate profile or an industrial project. Share what you need and we will prepare a quotation."
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    photographyType: "wedding",
    preferredDate: "",
    location: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");
  const [activeFaq, setActiveFaq] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Nothing is stored on a server: the enquiry goes straight to the studio's WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();
    const category = categories.find((c) => c.id === formData.photographyType);
    const enquiry = {
      name: formData.fullName,
      mobile: formData.phone,
      email: formData.email,
      service: category ? category.name : "Photography Shoot",
      date: formData.preferredDate,
      location: formData.location,
      details: formData.message
    };
    setWhatsappLink(whatsappUrl(buildEnquiryMessage(enquiry)));
    sendEnquiryToWhatsApp(enquiry);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      photographyType: "wedding",
      preferredDate: "",
      location: "",
      message: ""
    });
  };

  return (
    <div className="contact-page-root">
      {/* 1. Page header */}
      <PageHero
        eyebrow="Contact"
        title="Let's Talk About Your Story"
        subtitle="Whether you are planning a wedding celebration, an intimate maternity chronicle, or a fashion lookbook, our studio is here to guide you."
        image="/Images/Prewdding/231A0015a.jpg"
      />

      {/* 2. Main Contact Layout (Info on Left, Form on Right) */}
      <section className="contact-form-section section-padding">
        <div className="container">
          <div className="contact-grid">
            {/* Left Information Cards */}
            <div className="contact-info-col">
              <div className="info-intro-box">
                <span className="eyebrow">Get in Touch</span>
                <h2 className="info-title">{studio.name}, {studio.city}</h2>
                <p className="info-desc">
                  Contact Rudra Studio to discuss your project, check availability and receive a customized quotation.
                </p>
              </div>

              <div className="contact-details-cards">
                {/* Phone */}
                <div className="contact-card">
                  <div className="card-icon-gold">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="card-item-title">Call or WhatsApp</h4>
                    <a href={`tel:${studio.phoneTel}`} className="card-item-val link-hover">{studio.phoneDisplay}</a>
                    <p className="card-item-sub">
                      <a href={whatsappUrl("Hello Rudra Studio")} target="_blank" rel="noopener noreferrer" className="link-hover">Chat on WhatsApp</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-card">
                  <div className="card-icon-gold">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="card-item-title">Email</h4>
                    <a href={`mailto:${studio.email}`} className="card-item-val link-hover">{studio.email}</a>
                    <p className="card-item-sub">For quotations and project details</p>
                  </div>
                </div>

                {/* Studio Address */}
                <div className="contact-card">
                  <div className="card-icon-gold">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="card-item-title">Studio Address</h4>
                    <p className="card-item-val">Shop No. 22, Chourang Terrace Society</p>
                    <p className="card-item-sub">Tukai Darshan, Phursungi, Hadapsar, Pune, Maharashtra</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="contact-card">
                  <div className="card-icon-gold">
                    <Globe size={22} />
                  </div>
                  <div>
                    <h4 className="card-item-title">Service Area</h4>
                    <p className="card-item-val">Hadapsar, Pune</p>
                    <p className="card-item-sub">Services across India for large weddings and events</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking / Inquiry Form */}
            <div className="contact-form-col">
              <div className="booking-form-box">
                {submitted ? (
                  <div className="form-success-state">
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={54} className="success-check-icon" />
                    </div>
                    <span className="eyebrow">Almost Done</span>
                    <h3 className="success-heading">Thank You, {formData.fullName}!</h3>
                    <p className="success-message">
                      WhatsApp should now be open with your enquiry for <strong>{categories.find(c => c.id === formData.photographyType)?.name || "your shoot"}</strong> already written. <strong>Press Send in WhatsApp</strong> to deliver it to the studio, and we will reply with availability and a quotation.
                    </p>

                    <div className="success-summary-box">
                      <div className="summary-item">
                        <span>Preferred Date:</span>
                        <strong>{formData.preferredDate || "Flexible / To Be Decided"}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Contact Number:</span>
                        <strong>{formData.phone}</strong>
                      </div>
                    </div>

                    <div className="success-action-buttons">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold whatsapp-quick-btn"
                      >
                        <MessageSquare size={17} />
                        <span>WhatsApp did not open? Tap here</span>
                      </a>

                      <button onClick={handleReset} className="btn btn-outline">
                        <span>Send Another Enquiry</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-header">
                      <span className="eyebrow">Book a Shoot</span>
                      <h3 className="form-title">Send an Enquiry</h3>
                      <p className="form-sub">
                        Fill in the details below. Your enquiry opens in WhatsApp, ready to send to the studio.
                      </p>
                    </div>

                    <div className="form-inputs-grid">
                      {/* Full Name */}
                      <div className="form-group">
                        <label htmlFor="fullName" className="form-label">
                          Full Name <span className="req-star">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          placeholder="e.g. Priya Sharma"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      {/* Email */}
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="e.g. priya@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                          Phone Number <span className="req-star">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+91 90000 00000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      {/* Photography Type */}
                      <div className="form-group">
                        <label htmlFor="photographyType" className="form-label">
                          Photography Type <span className="req-star">*</span>
                        </label>
                        <select
                          id="photographyType"
                          name="photographyType"
                          required
                          value={formData.photographyType}
                          onChange={handleChange}
                          className="form-select"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id} className="select-opt">
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Preferred Date */}
                      <div className="form-group">
                        <label htmlFor="preferredDate" className="form-label">
                          Preferred Date / Month
                        </label>
                        <input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      {/* Shoot Location */}
                      <div className="form-group">
                        <label htmlFor="location" className="form-label">
                          Shoot Location / City
                        </label>
                        <input
                          id="location"
                          name="location"
                          type="text"
                          placeholder="e.g. Pune, Hadapsar, Udaipur, Goa, etc."
                          value={formData.location}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      {/* Message */}
                      <div className="form-group full-width">
                        <label htmlFor="message" className="form-label">
                          Tell Us About Your Event / Project
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Share event details, timings, number of days, or any questions..."
                          value={formData.message}
                          onChange={handleChange}
                          className="form-textarea"
                        ></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-gold form-submit-btn">
                      <Send size={18} />
                      <span>Send Enquiry on WhatsApp</span>
                    </button>

                    <p className="form-privacy-note">
                      Your details are sent directly to the studio on WhatsApp and are not stored on this website.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Google Maps Placeholder Section */}
      <section className="map-section section-padding">
        <div className="container">
          <div className="map-wrapper">
            <div className="map-header">
              <div className="map-header-left">
                <MapPin size={22} className="map-pin-gold" />
                <div>
                  <h3 className="map-title">Visit Our Studio in Pune</h3>
                  <p className="map-desc">Shop No. 22, Chourang Terrace Society, Tukai Darshan, Phursungi, Hadapsar, Pune</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Shop+No.+22,+Chourang+Terrace+Society,+Tukai+Darshan,+Phursungi,+Hadapsar,+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline map-dir-btn"
              >
                <span>Open in Google Maps</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Map embed */}
            <div className="map-canvas-container">
              <iframe
                title="Rudra Studio Hadapsar Pune location"
                src="https://maps.google.com/maps?q=Shop+No.+22,+Chourang+Terrace+Society,+Tukai+Darshan,+Phursungi,+Hadapsar,+Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <div className="map-pin-overlay">
                <div className="studio-pin-card">
                  <div className="pin-pulse-dot"></div>
                  <div>
                    <h5 className="pin-name">RUDRA STUDIO</h5>
                    <p className="pin-address">Tukai Darshan, Phursungi, Hadapsar, Pune</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions Section */}
      <section className="faq-section section-padding">
        <div className="container">
          <div className="contact-section-head">
            <span className="eyebrow">Frequent Inquiries</span>
            <h2 className="contact-h2">Questions &amp; Clarifications</h2>
            <p className="contact-section-sub">
              Quick answers about booking and how we work.
            </p>
          </div>

          <div className="faq-accordion-wrap">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? "faq-open" : ""}`}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <ChevronDown size={20} className={`faq-chevron ${isOpen ? "rotate" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
