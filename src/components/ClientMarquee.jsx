import React, { useState } from "react";
import { topClients } from "../data/clients";
import "./ClientMarquee.css";

export default function ClientMarquee() {
  const [hoveredClient, setHoveredClient] = useState(null);

  // Duplicate items twice to ensure endless seamless scroll loop
  const marqueeItems = [...topClients, ...topClients, ...topClients];

  return (
    <section className="client-marquee-section">
      <div className="container marquee-header-container">
        <h2 className="client-section-heading">Our Top Clients</h2>
        <p className="client-section-sub">
          Trusted by world-renowned luxury brands, couture designers, and prestigious hospitality groups.
        </p>
      </div>

      {/* Marquee Wrapper with continuous animation */}
      <div className="marquee-outer-container">
        {/* Soft edge gradient fades */}
        <div className="marquee-edge-fade left-fade"></div>
        <div className="marquee-edge-fade right-fade"></div>

        <div className="marquee-track">
          {marqueeItems.map((client, index) => {
            const isHovered = hoveredClient === `${client.id}-${index}`;

            return (
              <div
                key={`${client.id}-${index}`}
                className={`marquee-logo-card ${isHovered ? "is-hovered" : ""}`}
                onMouseEnter={() => setHoveredClient(`${client.id}-${index}`)}
                onMouseLeave={() => setHoveredClient(null)}
                onClick={() => setHoveredClient(isHovered ? null : `${client.id}-${index}`)}
                role="button"
                tabIndex={0}
                aria-label={`${client.name} partner details`}
              >
                {/* Logo Graphic / Typographic Emblem */}
                <div className="logo-badge-inner">
                  <span className="logo-main-text">{client.logoText}</span>
                  {client.subText && (
                    <span className="logo-sub-text">{client.subText}</span>
                  )}
                </div>

                {/* Hover Popup with Company Details */}
                <div className={`client-hover-popup ${isHovered ? "popup-visible" : ""}`}>
                  <div className="popup-arrow"></div>
                  <div className="popup-content">
                    <div className="popup-top">
                      <span className="popup-year">Partner since {client.year}</span>
                    </div>

                    <h4 className="popup-company-name">{client.name}</h4>
                    <p className="popup-industry">{client.industry}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
