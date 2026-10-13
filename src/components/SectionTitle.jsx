import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  maxWidth = "700px",
  className = ""
}) {
  return (
    <div className={`section-header-block align-${align} ${className}`}>
      {badge && (
        <div className="section-badge-wrapper">
          <span className="section-eyebrow">
            <span className="badge-dot" aria-hidden="true"></span>
            {badge}
          </span>
        </div>
      )}
      {title && <h2 className="section-main-heading">{title}</h2>}
      {subtitle && (
        <p className="section-subtext" style={{ maxWidth }}>
          {subtitle}
        </p>
      )}
      <div className={`title-gold-accent-line align-${align}`}></div>
    </div>
  );
}
