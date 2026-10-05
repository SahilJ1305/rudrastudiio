import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Camera, Menu, X, ArrowUpRight, Phone, Sparkles, LayoutDashboard } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import studioLogo from "../assets/logo-light-bg.png";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openBookingModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? "navbar-scrolled" : "navbar-transparent"}`}>
      <div className="navbar-container">
        {/* Brand / Logo (Only the logo image, links back to home) */}
        <Link 
          to="/" 
          className="navbar-logo" 
          aria-label="Rudra Studiio Home" 
          onClick={handleLogoClick}
        >
          <img 
            src={studioLogo} 
            alt="Rudra Studiio" 
            className="navbar-brand-logo" 
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
            end
          >
            <span>Home</span>
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
          >
            <span>Gallery</span>
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
          >
            <span>About Us</span>
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
          >
            <span>Contact Us</span>
          </NavLink>
        </nav>

        {/* Desktop CTA Action */}
        <div className="navbar-actions">
          <button 
            onClick={() => openBookingModal()} 
            className="btn btn-gold navbar-cta"
            aria-label="Book a Shoot"
          >
            <Sparkles size={16} />
            <span>Book a Shoot</span>
            <ArrowUpRight size={16} className="cta-arrow" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? "drawer-open" : ""}`}>
        <div className="mobile-menu-content">
          <div className="mobile-nav-header">
            <span className="mobile-nav-label">Navigation</span>
            <span className="mobile-nav-divider"></span>
          </div>
          <nav className="mobile-nav-links">
            <NavLink 
              to="/" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
              end
            >
              <span className="nav-num">01</span>
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
            >
              <span className="nav-num">02</span>
              <span>Gallery</span>
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
            >
              <span className="nav-num">03</span>
              <span>About Us</span>
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
            >
              <span className="nav-num">04</span>
              <span>Contact Us</span>
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
            >
              <span className="nav-num">05</span>
              <span>Staff Dashboard</span>
            </NavLink>
          </nav>

          <div className="mobile-menu-footer">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }} 
              className="btn btn-gold mobile-cta-btn"
            >
              <Sparkles size={18} />
              <span>Book a Shoot Today</span>
            </button>
            <div className="mobile-contact-quick">
              <Phone size={15} className="quick-icon" />
              <span>Direct Studio line: +91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
