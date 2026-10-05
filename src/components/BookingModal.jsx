import React, { useState, useEffect } from "react";
import { 
  X, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Mail, 
  User, 
  MapPin, 
  MessageSquare,
  ArrowLeft,
  Clock
} from "lucide-react";
import { categories } from "../data/categories";
import { saveEnquiry } from "../utils/storage";
import "./BookingModal.css";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BookingModal({ isOpen, onClose, initialCategory = "wedding" }) {
  // Step: 1 = Calendar, 2 = Form Details, 3 = Confirmation
  const [step, setStep] = useState(1);

  // Calendar State
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    eventType: initialCategory,
    location: "Studio, Hadapsar, Pune",
    message: ""
  });

  const [submittedEnquiry, setSubmittedEnquiry] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (!selectedDate) {
        // Default tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow.toISOString().split("T")[0]);
      }
    }
  }, [isOpen]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Month navigation helpers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate calendar days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleSelectDay = (day) => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return selectedDate === formattedDate;
  };

  const isDatePast = (day) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dateToCheck < startOfToday;
  };

  // Format date readable
  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "Not Selected";
    const [y, m, d] = dateStr.split("-");
    const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const categoryObj = categories.find((c) => c.id === formData.eventType);
    const eventName = categoryObj ? categoryObj.name : "Photography Shoot";

    setTimeout(() => {
      const created = saveEnquiry({
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        eventType: formData.eventType,
        eventName: eventName,
        preferredDate: selectedDate,
        location: formData.location,
        message: formData.message
      });

      setSubmittedEnquiry(created);
      setIsSubmitting(false);
      setStep(3);
    }, 700);
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="booking-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="modal-header">
          <div className="modal-header-text">
            <span className="badge-gold">
              <Sparkles size={13} className="spark-gold" />
              <span>RESERVE A SHOOT</span>
            </span>
            <h3 className="modal-main-title">
              {step === 1 && "Step 1: Choose Your Preferred Date"}
              {step === 2 && "Step 2: Client & Event Details"}
              {step === 3 && "Enquiry Confirmed"}
            </h3>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="modal-progress-bar">
          <div 
            className={`progress-step ${step >= 1 ? "active" : ""}`}
            onClick={() => step === 2 && setStep(1)}
          >
            <span className="step-dot">1</span>
            <span className="step-label">Select Date</span>
          </div>
          <div className="progress-divider"></div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
            <span className="step-dot">2</span>
            <span className="step-label">Shoot Details</span>
          </div>
          <div className="progress-divider"></div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
            <span className="step-dot">3</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>

        {/* Modal Body: STEP 1 - CALENDAR */}
        {step === 1 && (
          <div className="modal-step-body step-calendar-view">
            <p className="calendar-instruction">
              Select your desired celebration or session date from our availability calendar:
            </p>

            {/* Calendar Widget */}
            <div className="calendar-widget glass-card">
              {/* Month Navigation */}
              <div className="calendar-nav-bar">
                <button 
                  className="cal-nav-btn" 
                  onClick={handlePrevMonth}
                  aria-label="Previous Month"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="cal-month-title">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </div>
                <button 
                  className="cal-nav-btn" 
                  onClick={handleNextMonth}
                  aria-label="Next Month"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Day Headers (Sun - Sat) */}
              <div className="calendar-day-headers">
                {DAY_NAMES.map((day) => (
                  <div key={day} className="cal-day-header">{day}</div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="calendar-days-grid">
                {/* Empty cells before first day */}
                {[...Array(firstDayOfMonth)].map((_, i) => (
                  <div key={`empty-${i}`} className="cal-day-cell empty"></div>
                ))}

                {/* Day numbers */}
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const isSelected = isDateSelected(day);
                  const isPast = isDatePast(day);

                  return (
                    <button
                      key={day}
                      disabled={isPast}
                      onClick={() => handleSelectDay(day)}
                      className={`cal-day-cell ${isSelected ? "selected" : ""} ${isPast ? "past" : "available"}`}
                      aria-label={`Select ${MONTH_NAMES[currentMonth]} ${day}, ${currentYear}`}
                    >
                      <span className="day-number">{day}</span>
                      {isSelected && <span className="selected-glow"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Date Preview Bar */}
            <div className="selected-date-preview-bar">
              <div className="date-preview-left">
                <CalendarIcon size={18} className="gold-icon" />
                <div>
                  <span className="preview-label">Selected Shoot Date:</span>
                  <p className="preview-value">{formatDisplayDate(selectedDate)}</p>
                </div>
              </div>

              <button 
                className="btn btn-gold proceed-btn"
                onClick={() => setStep(2)}
                disabled={!selectedDate}
              >
                <span>Proceed to Details</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}

        {/* Modal Body: STEP 2 - DETAILS FORM */}
        {step === 2 && (
          <form onSubmit={handleFormSubmit} className="modal-step-body step-form-view">
            {/* Selected Date Banner with Edit Action */}
            <div className="selected-date-banner">
              <div className="date-banner-info">
                <CalendarIcon size={17} className="gold-icon" />
                <span>Shoot Date: <strong>{formatDisplayDate(selectedDate)}</strong></span>
              </div>
              <button 
                type="button" 
                className="edit-date-btn"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={14} /> Change Date
              </button>
            </div>

            <div className="modal-inputs-grid">
              {/* Full Name */}
              <div className="modal-field">
                <label className="field-label">Full Name <span className="req">*</span></label>
                <div className="input-wrap">
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Radhika Merchant"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="modal-field">
                <label className="field-label">Mobile Number <span className="req">*</span></label>
                <div className="input-wrap">
                  <Phone size={16} className="input-icon" />
                  <input
                    type="tel"
                    name="mobile"
                    required
                    placeholder="+91 98765 00000"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </div>
              </div>

              {/* Event / Shoot Type */}
              <div className="modal-field">
                <label className="field-label">Event / Category <span className="req">*</span></label>
                <select
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="modal-select"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email Address */}
              <div className="modal-field">
                <label className="field-label">Email Address <span className="req">*</span></label>
                <div className="input-wrap">
                  <Mail size={16} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. radhika@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="modal-field full-row">
                <label className="field-label">Shoot Location / Venue</label>
                <div className="input-wrap">
                  <MapPin size={16} className="input-icon" />
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Studio Hadapsar Pune, Udaipur Palace, Goa Beach, etc."
                    value={formData.location}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </div>
              </div>

              {/* Special Message */}
              <div className="modal-field full-row">
                <label className="field-label">Special Requests / Vision</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about the celebration vibe, schedule, or style preferences..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="modal-textarea"
                ></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-form-actions">
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} /> Back to Calendar
              </button>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-gold submit-enquiry-btn"
              >
                {isSubmitting ? (
                  <span>Sending Enquiry...</span>
                ) : (
                  <>
                    <span>Send Enquiry</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Modal Body: STEP 3 - CONFIRMATION */}
        {step === 3 && submittedEnquiry && (
          <div className="modal-step-body step-confirm-view">
            <div className="confirm-icon-box">
              <CheckCircle2 size={52} className="confirm-check" />
            </div>

            <h3 className="confirm-title">Enquiry Sent Successfully!</h3>
            <p className="confirm-sub">
              Thank you, <strong>{submittedEnquiry.fullName}</strong>. Your shoot request has been recorded and assigned reference:
            </p>

            <div className="ref-badge-card">
              <span className="ref-label">BOOKING REFERENCE</span>
              <span className="ref-number">{submittedEnquiry.refCode}</span>
            </div>

            <div className="confirm-summary-grid glass-card">
              <div className="summary-row">
                <span className="sum-title">Event:</span>
                <span className="sum-val">{submittedEnquiry.eventName}</span>
              </div>
              <div className="summary-row">
                <span className="sum-title">Preferred Date:</span>
                <span className="sum-val">{formatDisplayDate(submittedEnquiry.preferredDate)}</span>
              </div>
              <div className="summary-row">
                <span className="sum-title">Client Mobile:</span>
                <span className="sum-val">{submittedEnquiry.mobile}</span>
              </div>
              <div className="summary-row">
                <span className="sum-title">Shoot Location:</span>
                <span className="sum-val">{submittedEnquiry.location}</span>
              </div>
            </div>

            <div className="confirm-action-buttons">
              <a 
                href={`https://wa.me/919876543210?text=Hi%20Rudra%20Studio,%20I%20have%20submitted%20booking%20enquiry%20${submittedEnquiry.refCode}%20for%20${submittedEnquiry.eventName}%20on%20${submittedEnquiry.preferredDate}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold whatsapp-btn"
              >
                <MessageSquare size={17} />
                <span>Instant Connect on WhatsApp</span>
              </a>

              <button onClick={onClose} className="btn btn-outline">
                <span>Close Window</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
