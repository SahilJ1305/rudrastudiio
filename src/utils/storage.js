// Rudra Studiio - Client-Side Storage & Static Auth Utility

const ENQUIRIES_STORAGE_KEY = "rudra_studio_enquiries";
const AUTH_STORAGE_KEY = "rudra_admin_authenticated";

// Default realistic sample enquiries to populate the dashboard on first visit
const DEFAULT_ENQUIRIES = [
  {
    id: "enq-101",
    refCode: "RUDRA-849201",
    fullName: "Priyanka & Karan Kapoor",
    mobile: "+91 98201 44552",
    email: "priyanka.k@gmail.com",
    eventType: "wedding",
    eventName: "Wedding Photography",
    preferredDate: "2026-11-28",
    location: "Udaipur Royal Palace, Rajasthan",
    message: "Planning a 3-day royal heritage wedding. We love your dramatic low-key lighting and candid bidaai portraits.",
    status: "New",
    submittedAt: "2026-10-01T09:30:00.000Z"
  },
  {
    id: "enq-102",
    refCode: "RUDRA-719342",
    fullName: "Dr. Alok & Megha Varma",
    mobile: "+91 98110 33219",
    email: "megha.varma@outlook.com",
    eventType: "maternity",
    eventName: "Maternity Photography",
    preferredDate: "2026-10-25",
    location: "Studio Loft, Pune",
    message: "Looking for an ethereal fine-art maternity session with flowing silk fabric and golden backlight.",
    status: "Contacted",
    submittedAt: "2026-09-29T14:15:00.000Z"
  },
  {
    id: "enq-103",
    refCode: "RUDRA-602914",
    fullName: "Ananya Deshmukh",
    mobile: "+91 99200 88711",
    email: "ananya.d@studioelan.com",
    eventType: "fashion",
    eventName: "Fashion Photography",
    preferredDate: "2026-11-12",
    location: "Heritage Streets, Pune",
    message: "Winter haute couture lookbook shoot for 12 garments. Need full crew and studio lighting kit.",
    status: "Confirmed",
    submittedAt: "2026-09-27T11:45:00.000Z"
  },
  {
    id: "enq-104",
    refCode: "RUDRA-551098",
    fullName: "Rohit & Neha Singhania",
    mobile: "+91 98331 66200",
    email: "neha.singhania@gmail.com",
    eventType: "baby",
    eventName: "Baby Photography",
    preferredDate: "2026-10-18",
    location: "Rudra Warm Cocoon Studio",
    message: "Our newborn will be 14 days old. Want peaceful swaddled poses in organic merino wool.",
    status: "Completed",
    submittedAt: "2026-09-22T16:20:00.000Z"
  }
];

// Initialize enquiries in localStorage if not already present
export function initStorage() {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(DEFAULT_ENQUIRIES));
  }
}

// Retrieve all enquiries (newest first)
export function getEnquiries() {
  if (typeof window === "undefined") return DEFAULT_ENQUIRIES;
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(DEFAULT_ENQUIRIES));
      return DEFAULT_ENQUIRIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading enquiries from localStorage:", err);
    return DEFAULT_ENQUIRIES;
  }
}

// Save a new enquiry
export function saveEnquiry(data) {
  if (typeof window === "undefined") return null;
  try {
    const enquiries = getEnquiries();
    const id = "enq-" + Date.now();
    const refCode = "RUDRA-" + Math.floor(100000 + Math.random() * 900000);

    const newEnquiry = {
      id,
      refCode,
      fullName: data.fullName || "Guest Client",
      mobile: data.mobile || data.phone || "",
      email: data.email || "",
      eventType: data.eventType || data.photographyType || "wedding",
      eventName: data.eventName || data.eventType || "Photography Shoot",
      preferredDate: data.preferredDate || data.date || "TBD",
      location: data.location || "Studio Atelier",
      message: data.message || "",
      status: "New",
      submittedAt: new Date().toISOString()
    };

    const updated = [newEnquiry, ...enquiries];
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));

    // Dispatch event so any open view/dashboard updates immediately
    window.dispatchEvent(new CustomEvent("rudra_enquiries_updated", { detail: newEnquiry }));

    return newEnquiry;
  } catch (err) {
    console.error("Error saving enquiry:", err);
    return null;
  }
}

// Update status of an enquiry (New, Contacted, Confirmed, Completed)
export function updateEnquiryStatus(id, newStatus) {
  if (typeof window === "undefined") return false;
  try {
    const enquiries = getEnquiries();
    const updated = enquiries.map((enq) =>
      enq.id === id ? { ...enq, status: newStatus } : enq
    );
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("rudra_enquiries_updated"));
    return true;
  } catch (err) {
    console.error("Error updating enquiry status:", err);
    return false;
  }
}

// Delete an enquiry
export function deleteEnquiry(id) {
  if (typeof window === "undefined") return false;
  try {
    const enquiries = getEnquiries();
    const updated = enquiries.filter((enq) => enq.id !== id);
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("rudra_enquiries_updated"));
    return true;
  } catch (err) {
    console.error("Error deleting enquiry:", err);
    return false;
  }
}

// ==========================================
// Static Authentication (Credentials)
// Username: Rudra@studiio.in
// Password: Aditi@2007
// ==========================================
const VALID_USERNAME = "rudra@studiio.in";
const VALID_PASSWORD = "Aditi@2007";

export function checkAdminAuth() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function loginAdmin(username, password) {
  if (!username || !password) {
    return { success: false, message: "Please provide both username and password." };
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  if (cleanUser === VALID_USERNAME && cleanPass === VALID_PASSWORD) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
    sessionStorage.setItem("rudra_admin_user", username);
    return { success: true };
  }

  return { 
    success: false, 
    message: "Invalid credentials. Please verify your studio username and password." 
  };
}

export function logoutAdmin() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.removeItem("rudra_admin_user");
}
