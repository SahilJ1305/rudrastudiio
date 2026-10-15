import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Camera } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { getFullsizeUrl } from "../utils/mediaUrl";
import "./CTASection.css";

export default function CTASection({
  heading = "Let's Create Something Meaningful.",
  subtext = "Contact Rudra Studiio to discuss your project, check availability and receive a customized quotation.",
  primaryBtnText = "Book Your Shoot",
  secondaryBtnText = "View Our Gallery",
  secondaryBtnLink = "/gallery"
}) {
  const { openBookingModal } = useBooking();

  return (
    <section className="cta-section-wrapper">
      <div className="cta-bg-layer">
        <img
          src={getFullsizeUrl("/Images/Prewdding/231A0128 copy.jpg")}
          alt="Pre-wedding couple photographed by Rudra Studiio"
          className="cta-bg-image"
          loading="lazy"
        />
        <div className="cta-vignette-overlay"></div>
      </div>

      <div className="container cta-container-inner">
        <div className="cta-content-box">
          <div className="cta-badge">
            <Sparkles size={14} className="gold-spark" />
            <span>GET A QUOTATION</span>
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
            <span>Location: Hadapsar, Pune</span>
          </div>
        </div>
      </div>
    </section>
  );
}
