import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  MessageSquare,
  ArrowRight,
  Camera
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { categories } from "../data/categories";
import { saveEnquiry } from "../utils/storage";
import "./Contact.css";

const faqs = [
  {
    q: "How far in advance should we reserve our shoot date?",
    a: "For weddings and high-season destination pre-weddings, we recommend booking 6 to 12 months in advance to ensure availability. For portrait, baby, and fashion editorial shoots, 2 to 4 weeks advance notice is typically sufficient."
  },
  {
    q: "What is your typical turnaround time for gallery delivery?",
    a: "We provide an editorial preview of 25-30 highlight photos within 72 hours of your shoot. The complete hand-retouched high-resolution digital gallery is delivered within 3 to 4 weeks. Custom leather heirloom albums require an additional 2-3 weeks for fine-art bookbinding."
  },
  {
    q: "Do you travel across India and internationally for destination shoots?",
    a: "Yes! Approximately 40% of our calendar consists of destination commissions across Rajasthan, Goa, Kashmir, Europe, Dubai, and Southeast Asia. We manage all our logistics seamlessly."
  },
  {
    q: "Do you assist with wardrobe styling, concepts, and location permits?",
    a: "Absolutely. Our Creative Director Anya Sen collaborates with each client to develop custom moodboards, color palette recommendations, wardrobe styling tips, and coordinates private location permits."
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const categoryObj = categories.find((c) => c.id === formData.photographyType);
    const eventName = categoryObj ? categoryObj.name : "Photography Shoot";

    setTimeout(() => {
      saveEnquiry({
        fullName: formData.fullName,
        mobile: formData.phone,
        email: formData.email,
        eventType: formData.photographyType,
        eventName: eventName,
        preferredDate: formData.preferredDate || "TBD",
        location: formData.location || "Studio Atelier",
        message: formData.message
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
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
      {/* 1. Header Section */}
      <section className="contact-hero-section">
        <div className="container">
          <div className="contact-hero-text">
            <span className="badge-gold">CONCIERGE & COMMISSIONS</span>
            <h1 className="contact-main-title">
              Let's Talk About <br />
              <span className="gold-gradient-text">Your Story.</span>
            </h1>
            <p className="contact-hero-sub">
              Whether you are planning a royal wedding celebration, an intimate maternity chronicle, or a high-fashion lookbook, our studio concierge is here to guide you.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Layout (Info on Left, Form on Right) */}
      <section className="contact-form-section section-padding">
        <div className="container">
          <div className="contact-grid">
            {/* Left Information Cards */}
            <div className="contact-info-col">
              <div className="info-intro-box">
                <span className="badge-gold">ATELIER CONTACT</span>
                <h2 className="info-title">Studio Rudra Concierge</h2>
                <p className="info-desc">
                  We welcome private consultations at our Pune studio. Please call ahead to ensure our creative director is reserved for your private appointment.
                </p>
              </div>

              <div className="contact-details-cards">
                {/* Phone */}
                <div className="contact-card glass-card">
                  <div className="card-icon-gold">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="card-item-title">Telephone & Direct Inquiries</h4>
                    <a href="tel:+919876543210" className="card-item-val link-hover">+91 98765 43210</a>
                    <p className="card-item-sub">Available Mon – Sat, 9am – 8pm</p>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-card glass-card">
                  <div className="card-icon-gold">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="card-item-title">Editorial & Booking Email</h4>
                    <a href="mailto:hello@rudrastudiio.in" className="card-item-val link-hover">hello@rudrastudiio.in</a>
                    <p className="card-item-sub">Response within 24 business hours</p>
                  </div>
                </div>

                {/* Studio Address */}
                <div className="contact-card glass-card">
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
                <div className="contact-card glass-card">
                  <div className="card-icon-gold">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="card-item-title">Working Hours</h4>
                    <p className="card-item-val">Tuesday – Sunday: 9:00 AM – 8:00 PM</p>
                    <p className="card-item-sub">Mondays dedicated to private location shoots</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking / Inquiry Form */}
            <div className="contact-form-col">
              <div className="booking-form-box glass-panel">
                {submitted ? (
                  <div className="form-success-state">
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={54} className="success-check-icon" />
                    </div>
                    <span className="badge-gold">INQUIRY RECEIVED</span>
                    <h3 className="success-heading">Thank You, {formData.fullName}!</h3>
                    <p className="success-message">
                      Your shoot inquiry for <strong>{categories.find(c => c.id === formData.photographyType)?.name || "your shoot"}</strong> has been received by our studio concierge. We have sent a confirmation email to <strong>{formData.email}</strong>.
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
                      <div className="summary-item">
                        <span>Inquiry Reference:</span>
                        <strong>#RUDRA-{Math.floor(100000 + Math.random() * 900000)}</strong>
                      </div>
                    </div>

                    <div className="success-action-buttons">
                      <a 
                        href={`https://wa.me/919876543210?text=Hi%20Rudra%20Studio,%20I%20just%20submitted%20an%20inquiry%20for%20${formData.photographyType}%20photography.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold whatsapp-quick-btn"
                      >
                        <MessageSquare size={17} />
                        <span>Instant Connect on WhatsApp</span>
                      </a>

                      <button onClick={handleReset} className="btn btn-outline">
                        <span>Submit Another Inquiry</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-header">
                      <span className="badge-gold">RESERVE YOUR SESSION</span>
                      <h3 className="form-title">Send An Inquiry</h3>
                      <p className="form-sub">
                        Fill out the details below and we will prepare a bespoke package and availability estimate.
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
                          Email Address <span className="req-star">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
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
                          placeholder="+91 98765 00000"
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
                          Tell Us About Your Vision & Special Requests <span className="req-star">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          placeholder="Share ceremony details, timeline, aesthetic preferences, or questions..."
                          value={formData.message}
                          onChange={handleChange}
                          className="form-textarea"
                        ></textarea>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="btn btn-gold form-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="submitting-spinner"></div>
                          <span>Preparing Your Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>

                    <p className="form-privacy-note">
                      🔒 Your personal information is strictly confidential and never shared with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Google Maps Placeholder Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-wrapper glass-panel">
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

            {/* Stylized Dark Map Embed / Visual Placeholder */}
            <div className="map-canvas-container">
              <iframe
                title="Rudra Photo Studio Pune Location"
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
                    <h5 className="pin-name">RUDRA PHOTO STUDIO</h5>
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
          <SectionTitle 
            badge="FREQUENT INQUIRIES"
            title={<>Questions <span className="gold-gradient-text">& Clarifications</span></>}
            subtitle="Everything you need to know about booking, deliverables, travel policies, and the shoot experience."
          />

          <div className="faq-accordion-wrap">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className={`faq-item glass-card ${isOpen ? "faq-open" : ""}`}
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
