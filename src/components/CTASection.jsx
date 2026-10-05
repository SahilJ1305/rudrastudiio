import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Camera } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import "./CTASection.css";

export default function CTASection({
  heading = "Let's Create Something Beautiful.",
  subtext = "Have a special moment coming up? Let's turn it into something you'll treasure forever.",
  primaryBtnText = "Book Your Shoot",
  primaryBtnLink = "/contact",
  secondaryBtnText = "View Our Gallery",
  secondaryBtnLink = "/gallery"
}) {
  const { openBookingModal } = useBooking();

  return (
    <section className="cta-section-wrapper">
      <div className="cta-bg-layer">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80" 
          alt="Cinematic Photography Background" 
          className="cta-bg-image"
          loading="lazy"
        />
        <div className="cta-vignette-overlay"></div>
      </div>

      <div className="container cta-container-inner">
        <div className="cta-content-box">
          <div className="cta-badge">
            <Sparkles size={14} className="gold-spark" />
            <span>RESERVE YOUR DATE</span>
          </div>

          <h2 className="cta-heading">{heading}</h2>

          <p className="cta-subtext">{subtext}</p>

          <div className="cta-buttons-row">
            <button 
              onClick={() => openBookingModal()} 
              className="btn btn-gold cta-btn-main"
            >
              <Camera size={18} />
              <span>{primaryBtnText}</span>
              <ArrowRight size={17} />
            </button>

            <Link to={secondaryBtnLink} className="btn btn-outline cta-btn-secondary">
              <span>{secondaryBtnText}</span>
            </Link>
          </div>

          <div className="cta-note">
            <span>✨ Limited weekend dates available for 2026 celebrations</span>
          </div>
        </div>
      </div>
    </section>
  );
}
