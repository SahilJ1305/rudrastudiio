import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ArrowUpRight

} from "lucide-react";
import { YoutubeIcon } from "./SocialIcons";
import { studio, whatsappUrl } from "../data/studio";
import studioLogo from "../assets/logo.png";
import "./Footer.css";

export default function Footer() {
  const scrollToTopSmooth = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-top-accent"></div>

      <div className="container footer-content">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col footer-brand-col">
            <Link to="/" className="footer-logo" onClick={scrollToTopSmooth} aria-label="Rudra Studiio Home">
              <img src={studioLogo} alt="Rudra Studiio" className="footer-brand-logo-img" />
            </Link>

            <p className="footer-motto">
              {studio.tagline}.
            </p>

            <p className="footer-bio">
              At Rudra Studio, Hadapsar, Pune, we transform special moments and powerful business stories into memorable photographs and films.
            </p>

            <div className="footer-socials">
              <a href={studio.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-pill">
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/" onClick={scrollToTopSmooth}>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" onClick={scrollToTopSmooth}>
                  <span>Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTopSmooth}>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTopSmooth}>
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTopSmooth} className="gold-highlight-link">
                  <span>Book a Session</span>
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/gallery/wedding" onClick={scrollToTopSmooth}>
                  <span>Wedding Photography</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery/pre-wedding" onClick={scrollToTopSmooth}>
                  <span>Pre-Wedding Photography</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery/product" onClick={scrollToTopSmooth}>
                  <span>Product Photography</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery/events" onClick={scrollToTopSmooth}>
                  <span>Events &amp; Celebrations</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" onClick={scrollToTopSmooth} className="all-cats-link">
                  <span>View All Albums →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-heading">Studio Visit</h4>
            <div className="footer-contact-items">
              <div className="footer-contact-item">
                <MapPin size={18} className="contact-icon" />
                <div>
                  <p className="contact-bold">Rudra Studio</p>
                  <p className="contact-light">{studio.address}</p>
                </div>
              </div>

              <div className="footer-contact-item">
                <Phone size={18} className="contact-icon" />
                <div>
                  <a href={`tel:${studio.phoneTel}`} className="contact-link">{studio.phoneDisplay}</a>
                  <p className="contact-light">
                    <a href={whatsappUrl("Hello Rudra Studio")} target="_blank" rel="noopener noreferrer" className="contact-link">WhatsApp us</a>
                  </p>
                </div>
              </div>

              <div className="footer-contact-item">
                <Mail size={18} className="contact-icon" />
                <div>
                  <a href={`mailto:${studio.email}`} className="contact-link">{studio.email}</a>
                  <p className="contact-light">Quotations &amp; project enquiries</p>
                </div>
              </div>

              <div className="footer-contact-item">
                <Globe size={18} className="contact-icon" />
                <div>
                  <p className="contact-bold">Hadapsar, Pune</p>
                  <p className="contact-light">Services across India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Divider & Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <p>© 2026 Rudra Studio. All Rights Reserved.</p>
          </div>

          <div className="footer-bottom-center">
            <p className="designed-passion">
              We Capture Purpose.
            </p>
          </div>

          <div className="footer-bottom-right">
            <button onClick={scrollToTopSmooth} className="back-to-top-btn" aria-label="Back to top">
              <span>Back to top</span>
              <span className="arrow-top">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
