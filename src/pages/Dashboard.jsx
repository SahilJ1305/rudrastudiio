import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Camera, 
  Lock, 
  User, 
  KeyRound, 
  LogOut, 
  Search, 
  Filter, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  ArrowLeft,
  X,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Plus
} from "lucide-react";
import { 
  checkAdminAuth, 
  loginAdmin, 
  logoutAdmin, 
  getEnquiries, 
  updateEnquiryStatus, 
  deleteEnquiry 
} from "../utils/storage";
import { useBooking } from "../context/BookingContext";
import studioLogoStacked from "../assets/logo-light-bg.png";
import studioLogoHorizontal from "../assets/logo-horizontal.png";
import "./Dashboard.css";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard Data State
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const { openBookingModal } = useBooking();

  // Check auth and load enquiries on mount
  useEffect(() => {
    const authed = checkAdminAuth();
    setIsAuthenticated(authed);
    if (authed) {
      loadEnquiries();
    }
  }, []);

  // Listen for storage events (e.g. when an enquiry is added from the site)
  useEffect(() => {
    const handleUpdate = () => {
      loadEnquiries();
    };

    window.addEventListener("rudra_enquiries_updated", handleUpdate);
    return () => window.removeEventListener("rudra_enquiries_updated", handleUpdate);
  }, []);

  const loadEnquiries = () => {
    const list = getEnquiries();
    setEnquiries(list);
  };

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    const result = loginAdmin(username, password);
    if (result.success) {
      setIsAuthenticated(true);
      loadEnquiries();
    } else {
      setLoginError(result.message);
    }
  };

  // Quick Demo fill
  const handleFillDemo = () => {
    setUsername("Rudra@studiio.in");
    setPassword("Aditi@2007");
    setLoginError("");
  };

  // Handle Logout
  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // Handle Status Update
  const handleStatusChange = (id, newStatus) => {
    updateEnquiryStatus(id, newStatus);
    loadEnquiries();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Handle Delete
  const handleDelete = (id, clientName) => {
    if (window.confirm(`Are you sure you want to delete the enquiry from "${clientName}"?`)) {
      deleteEnquiry(id);
      loadEnquiries();
      if (detailsModalOpen && selectedEnquiry?.id === id) {
        setDetailsModalOpen(false);
      }
    }
  };

  // View Details
  const handleViewDetails = (enq) => {
    setSelectedEnquiry(enq);
    setDetailsModalOpen(true);
  };

  // Filtered enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq) => {
      // Search
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        !searchTerm ||
        (enq.fullName && enq.fullName.toLowerCase().includes(searchLower)) ||
        (enq.mobile && enq.mobile.includes(searchTerm)) ||
        (enq.email && enq.email.toLowerCase().includes(searchLower)) ||
        (enq.refCode && enq.refCode.toLowerCase().includes(searchLower)) ||
        (enq.location && enq.location.toLowerCase().includes(searchLower));

      // Event Type
      const matchesEvent = eventFilter === "all" || enq.eventType === eventFilter;

      // Status
      const matchesStatus = statusFilter === "all" || enq.status === statusFilter;

      return matchesSearch && matchesEvent && matchesStatus;
    });
  }, [enquiries, searchTerm, eventFilter, statusFilter]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = enquiries.length;
    const newCount = enquiries.filter((e) => e.status === "New").length;
    const contactedCount = enquiries.filter((e) => e.status === "Contacted").length;
    const confirmedCount = enquiries.filter((e) => e.status === "Confirmed").length;
    return { total, newCount, contactedCount, confirmedCount };
  }, [enquiries]);

  // Format Date
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "TBD") return "Flexible / TBD";
    try {
      const [y, m, d] = dateStr.split("-");
      if (!y || !m || !d) return dateStr;
      const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
      return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  const formatTimestamp = (isoStr) => {
    if (!isoStr) return "";
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return isoStr;
    }
  };

  // ==========================================
  // VIEW 1: LOGIN SCREEN (If not authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="login-card glass-panel">
          <div className="login-header">
            <div className="login-logo-showcase">
              <img src={studioLogoStacked} alt="Rudra Studiio" className="login-logo-hero" />
            </div>
            <span className="badge-gold">STUDIO ATELIER ACCESS</span>
            <h2 className="login-heading">Concierge Dashboard</h2>
            <p className="login-sub">
              Sign in with authorized studio credentials to view client booking inquiries and calendar requests.
            </p>
          </div>

          {loginError && (
            <div className="login-error-banner">
              <span>⚠️ {loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="login-field">
              <label className="login-label">Authorized Username</label>
              <div className="login-input-wrap">
                <User size={17} className="login-icon" />
                <input
                  type="text"
                  required
                  placeholder="Rudra@studiio.in"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="login-input"
                />
              </div>
            </div>

            <div className="login-field">
              <label className="login-label">Studio Password</label>
              <div className="login-input-wrap">
                <KeyRound size={17} className="login-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                />
                <button
                  type="button"
                  className="toggle-pass-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-gold login-submit-btn">
              <Lock size={16} />
              <span>Unlock Studio Dashboard</span>
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="demo-credentials-helper">
            <p className="demo-helper-text">
              Credentials: <code>Rudra@studiio.in</code> / <code>Aditi@2007</code>
            </p>
            <button 
              type="button" 
              onClick={handleFillDemo} 
              className="fill-demo-btn"
            >
              Fill Demo Credentials
            </button>
          </div>

          <div className="login-back-home">
            <Link to="/" className="back-home-link">
              <ArrowLeft size={14} /> Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED DASHBOARD
  // ==========================================
  return (
    <div className="dashboard-root">
      {/* Top Admin Bar */}
      <header className="dashboard-topbar">
        <div className="container dashboard-topbar-inner">
          <div className="topbar-brand">
            <Link to="/" className="topbar-logo" aria-label="Rudra Studiio Home">
              <img src={studioLogoStacked} alt="Rudra Studiio" className="topbar-brand-logo-img" />
            </Link>
            <span className="topbar-divider"></span>
            <span className="topbar-tag">ENQUIRIES CONCIERGE</span>
          </div>

          <div className="topbar-right">
            <button 
              onClick={() => openBookingModal()} 
              className="btn btn-gold topbar-add-btn"
            >
              <Plus size={15} />
              <span>New Booking Enquiry</span>
            </button>

            <Link to="/" className="topbar-link">
              <span>Main Website</span>
              <ExternalLink size={14} />
            </Link>

            <button onClick={handleLogout} className="topbar-logout-btn">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main container">
        {/* Welcome Banner & KPI Stats */}
        <section className="dashboard-header-section">
          <div>
            <span className="badge-gold">
              <Sparkles size={13} />
              LIVE ENQUIRY DATABASE
            </span>
            <h1 className="dashboard-title">Studio Enquiries & Bookings</h1>
            <p className="dashboard-sub">
              Review all client requests received through the website calendar and booking forms.
            </p>
          </div>

          {/* KPI Stat Cards */}
          <div className="kpi-cards-grid">
            <div className="kpi-card glass-card">
              <div className="kpi-header">
                <span className="kpi-label">Total Enquiries</span>
                <Layers size={18} className="kpi-icon" />
              </div>
              <span className="kpi-number">{stats.total}</span>
              <span className="kpi-sub">All-time recorded</span>
            </div>

            <div className="kpi-card glass-card highlight-card">
              <div className="kpi-header">
                <span className="kpi-label">New / Action Needed</span>
                <Clock size={18} className="kpi-icon gold-icon" />
              </div>
              <span className="kpi-number gold-number">{stats.newCount}</span>
              <span className="kpi-sub">Awaiting response</span>
            </div>

            <div className="kpi-card glass-card">
              <div className="kpi-header">
                <span className="kpi-label">Contacted</span>
                <Phone size={18} className="kpi-icon" />
              </div>
              <span className="kpi-number">{stats.contactedCount}</span>
              <span className="kpi-sub">In consultation</span>
            </div>

            <div className="kpi-card glass-card">
              <div className="kpi-header">
                <span className="kpi-label">Confirmed Shoots</span>
                <CheckCircle2 size={18} className="kpi-icon green-icon" />
              </div>
              <span className="kpi-number green-number">{stats.confirmedCount}</span>
              <span className="kpi-sub">Dates reserved</span>
            </div>
          </div>
        </section>

        {/* Filters & Search Toolbar */}
        <section className="dashboard-toolbar glass-panel">
          <div className="toolbar-search-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by client name, mobile, email, ref code, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="toolbar-search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")} 
                className="clear-search-btn"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="toolbar-filters">
            {/* Event Category Filter */}
            <div className="filter-select-wrap">
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="toolbar-select"
              >
                <option value="all">All Events ({enquiries.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="filter-select-wrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="toolbar-select"
              >
                <option value="all">All Statuses</option>
                <option value="New">New ({stats.newCount})</option>
                <option value="Contacted">Contacted ({stats.contactedCount})</option>
                <option value="Confirmed">Confirmed ({stats.confirmedCount})</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button 
              onClick={loadEnquiries} 
              className="toolbar-refresh-btn"
              title="Refresh Enquiries"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </section>

        {/* Enquiries Records Table / List */}
        <section className="dashboard-table-section">
          {filteredEnquiries.length === 0 ? (
            <div className="no-enquiries-box glass-card">
              <Calendar size={48} className="gold-icon" />
              <h3>No enquiries found</h3>
              <p>No client enquiries match your current search or filter criteria.</p>
              {(searchTerm || eventFilter !== "all" || statusFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setEventFilter("all");
                    setStatusFilter("all");
                  }}
                  className="btn btn-outline"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="enquiries-cards-container">
              {filteredEnquiries.map((enq) => {
                const category = categories.find((c) => c.id === enq.eventType);
                const eventDisplayName = category ? category.name : (enq.eventName || enq.eventType);

                return (
                  <div key={enq.id} className="enquiry-row-card glass-card">
                    {/* Left: Client & Ref */}
                    <div className="enquiry-card-col-client">
                      <div className="enquiry-ref-tag">
                        <span>{enq.refCode || "#RUDRA-NEW"}</span>
                        <span className="enquiry-time">{formatTimestamp(enq.submittedAt)}</span>
                      </div>
                      <h4 className="enquiry-client-name">{enq.fullName}</h4>
                      
                      <div className="enquiry-contact-links">
                        <a href={`tel:${enq.mobile}`} className="contact-sublink">
                          <Phone size={13} /> {enq.mobile || "No Mobile"}
                        </a>
                        {enq.email && (
                          <a href={`mailto:${enq.email}`} className="contact-sublink">
                            <Mail size={13} /> {enq.email}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Middle: Event & Date */}
                    <div className="enquiry-card-col-event">
                      <div className="event-badge-pill">
                        <Camera size={13} />
                        <span>{eventDisplayName}</span>
                      </div>

                      <div className="event-date-row">
                        <Calendar size={15} className="gold-icon" />
                        <span className="event-date-text">
                          {formatDate(enq.preferredDate)}
                        </span>
                      </div>

                      {enq.location && (
                        <div className="event-loc-row">
                          <MapPin size={13} />
                          <span>{enq.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Message snippet */}
                    <div className="enquiry-card-col-notes">
                      <p className="enquiry-message-snippet">
                        {enq.message ? `"${enq.message}"` : "No special notes provided."}
                      </p>
                    </div>

                    {/* Right: Status & Actions */}
                    <div className="enquiry-card-col-actions">
                      {/* Status Dropdown */}
                      <div className="status-selector-wrap">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className={`status-badge-select status-${enq.status.toLowerCase()}`}
                        >
                          <option value="New">● New</option>
                          <option value="Contacted">● Contacted</option>
                          <option value="Confirmed">● Confirmed</option>
                          <option value="Completed">● Completed</option>
                        </select>
                      </div>

                      {/* Action Icon Buttons */}
                      <div className="action-buttons-group">
                        <button 
                          onClick={() => handleViewDetails(enq)} 
                          className="action-icon-btn view-btn"
                          title="View Full Enquiry Details"
                        >
                          <Eye size={16} />
                        </button>

                        {enq.mobile && (
                          <a 
                            href={`https://wa.me/${enq.mobile.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(enq.fullName)},%20this%20is%20Rudra%20Studio%20regarding%20your%20${encodeURIComponent(eventDisplayName)}%20enquiry.`}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="action-icon-btn whatsapp-btn"
                            title="Open in WhatsApp"
                          >
                            <MessageSquare size={16} />
                          </a>
                        )}

                        <button 
                          onClick={() => handleDelete(enq.id, enq.fullName)} 
                          className="action-icon-btn delete-btn"
                          title="Delete Enquiry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* FULL DETAILS MODAL */}
      {detailsModalOpen && selectedEnquiry && (
        <div className="enquiry-details-overlay" onClick={() => setDetailsModalOpen(false)}>
          <div className="enquiry-details-card glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="details-modal-header">
              <div>
                <span className="badge-gold">ENQUIRY RECORD</span>
                <h3 className="details-client-name">{selectedEnquiry.fullName}</h3>
                <span className="details-ref-code">{selectedEnquiry.refCode}</span>
              </div>
              <button 
                onClick={() => setDetailsModalOpen(false)} 
                className="modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="details-modal-body">
              <div className="details-info-grid">
                <div className="detail-item">
                  <span className="detail-label">Mobile Number</span>
                  <p className="detail-val highlight">{selectedEnquiry.mobile || "Not Provided"}</p>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Email Address</span>
                  <p className="detail-val">{selectedEnquiry.email || "Not Provided"}</p>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Event / Category</span>
                  <p className="detail-val gold-val">{selectedEnquiry.eventName || selectedEnquiry.eventType}</p>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Preferred Shoot Date</span>
                  <p className="detail-val">{formatDate(selectedEnquiry.preferredDate)}</p>
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label">Shoot Location / Venue</span>
                  <p className="detail-val">{selectedEnquiry.location || "Studio Atelier"}</p>
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label">Submitted On</span>
                  <p className="detail-val">{formatTimestamp(selectedEnquiry.submittedAt)}</p>
                </div>

                <div className="detail-item full-width">
                  <span className="detail-label">Client Notes & Special Vision</span>
                  <div className="detail-notes-box">
                    <p>{selectedEnquiry.message || "No additional message submitted."}</p>
                  </div>
                </div>
              </div>

              {/* Status Update In Modal */}
              <div className="details-status-row">
                <span className="detail-label">Current Pipeline Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                  className={`status-badge-select status-${selectedEnquiry.status.toLowerCase()}`}
                >
                  <option value="New">● New</option>
                  <option value="Contacted">● Contacted</option>
                  <option value="Confirmed">● Confirmed</option>
                  <option value="Completed">● Completed</option>
                </select>
              </div>

              {/* Quick Communication Actions */}
              <div className="details-modal-actions">
                {selectedEnquiry.mobile && (
                  <a 
                    href={`https://wa.me/${selectedEnquiry.mobile.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(selectedEnquiry.fullName)},%20this%20is%20Rudra%20Studio%20regarding%20your%20${encodeURIComponent(selectedEnquiry.eventName)}%20enquiry.`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-gold modal-wa-btn"
                  >
                    <MessageSquare size={17} />
                    <span>WhatsApp Client</span>
                  </a>
                )}

                {selectedEnquiry.mobile && (
                  <a 
                    href={`tel:${selectedEnquiry.mobile}`}
                    className="btn btn-outline"
                  >
                    <Phone size={16} />
                    <span>Call Mobile</span>
                  </a>
                )}

                <button 
                  onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.fullName)} 
                  className="btn btn-outline delete-outline-btn"
                >
                  <Trash2 size={16} />
                  <span>Delete Record</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
