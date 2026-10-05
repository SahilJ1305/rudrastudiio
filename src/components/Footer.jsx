import React from "react";
import { Link } from "react-router-dom";
import { 
  Camera, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  Heart
} from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./SocialIcons";
import studioLogo from "../assets/logo-light-bg.png";
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
              "Capturing moments. Creating memories."
            </p>
            
            <p className="footer-bio">
              A premier luxury photography & cinematography studio dedicated to immortalizing life's most profound celebrations with editorial grace and emotional depth.
            </p>

            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-pill">
                <InstagramIcon size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-pill">
                <FacebookIcon size={18} />
              </a>
              <a href="https://youtube.com/@rudrastudiio?si=2MdmxG5qGv20cG4G" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-pill">
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
              <li>
                <Link to="/dashboard" onClick={scrollToTopSmooth} className="dashboard-footer-link">
                  <span>Concierge Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/gallery/wedding" onClick={scrollToTopSmooth}>
                  <span>Wedding Photography</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery/baby" onClick={scrollToTopSmooth}>
                  <span>Baby Photography</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery/maternity" onClick={scrollToTopSmooth}>
                  <span>Maternity Photography</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery/portrait" onClick={scrollToTopSmooth}>
                  <span>Portrait Photography</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery/fashion" onClick={scrollToTopSmooth}>
                  <span>Fashion Photography</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" onClick={scrollToTopSmooth} className="all-cats-link">
                  <span>View All 10 Categories →</span>
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
                  <p className="contact-bold">Rudra Photo Studio</p>
                  <p className="contact-light">Shop No. 22, Chourang Terrace Society, Tukai Darshan, Phursungi, Hadapsar, Pune</p>
                </div>
              </div>

              <div className="footer-contact-item">
                <Phone size={18} className="contact-icon" />
                <div>
                  <a href="tel:+919876543210" className="contact-link">+91 98765 43210</a>
                  <p className="contact-light">Concierge & Bookings</p>
                </div>
              </div>

              <div className="footer-contact-item">
                <Mail size={18} className="contact-icon" />
                <div>
                  <a href="mailto:hello@rudrastudiio.in" className="contact-link">hello@rudrastudiio.in</a>
                  <p className="contact-light">Editorial & Commissions</p>
                </div>
              </div>

              <div className="footer-contact-item">
                <Clock size={18} className="contact-icon" />
                <div>
                  <p className="contact-bold">Tue – Sun: 9:00 AM – 8:00 PM</p>
                  <p className="contact-light">Mondays by appointment only</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Divider & Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <p>© 2026 Rudra Studiio. All Rights Reserved.</p>
          </div>

          <div className="footer-bottom-center">
            <p className="designed-passion">
              Designed with <Heart size={14} className="heart-icon" /> passion for photography.
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
