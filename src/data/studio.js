// Single source of truth for Rudra Studio's contact details and enquiry hand-off.

export const studio = {
  name: "Rudra Studio",
  tagline: "We Capture Purpose",
  founder: "Laxman Jagtap",
  city: "Hadapsar, Pune",
  address: "Shop No. 22, Chourang Terrace Society, Tukai Darshan, Phursungi, Hadapsar, Pune",
  phoneDisplay: "+91 9673923911",
  phoneTel: "+919673923911",
  whatsappNumber: "9673923911",
  email: "rudradigitalstudio@gmail.com",
  youtubeUrl: "https://youtube.com/@rudrastudiio?si=2MdmxG5qGv20cG4G"
};

export const whatsappUrl = (message = "") =>
  `https://wa.me/${studio.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

const formatDate = (value) => {
  if (!value) return "Not decided yet";
  const [y, m, d] = String(value).split("-").map(Number);
  if (!y || !m || !d) return String(value);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
};

/**
 * Builds the WhatsApp message sent to the studio from the booking popup / contact form.
 * Every field the visitor filled in is included; empty ones are left out.
 */
export function buildEnquiryMessage({ name, mobile, email, service, date, location, details }) {
  const lines = [
    `Hello ${studio.name}, I would like to enquire about a shoot.`,
    "",
    `*Name:* ${name}`,
    `*Mobile:* ${mobile}`,
    email ? `*Email:* ${email}` : null,
    `*Service:* ${service}`,
    `*Preferred date:* ${formatDate(date)}`,
    location ? `*Location / venue:* ${location}` : null,
    details ? `*Details:* ${details}` : null,
    "",
    "Please share availability and a quotation. Thank you!"
  ];
  return lines.filter((line) => line !== null).join("\n");
}

/** Opens WhatsApp with the enquiry prefilled. Must be called from a click/submit handler. */
export function sendEnquiryToWhatsApp(enquiry) {
  const url = whatsappUrl(buildEnquiryMessage(enquiry));
  window.open(url, "_blank", "noopener,noreferrer");
  return url;
}
