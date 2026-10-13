import React from "react";
import { clientLogos } from "../data/clients";
import { getMediaUrl } from "../utils/mediaUrl";
import "./ClientLogos.css";

/**
 * Endless horizontal logo strip. The list is rendered twice and the track slides
 * by exactly half its width, so the loop is seamless. Pauses on hover.
 */
export default function ClientLogos() {
  const loop = [...clientLogos, ...clientLogos];

  return (
    <section className="client-logos" aria-label="Our clients">
      <p className="client-logos-label">
        <span className="eyebrow">Trusted by our clients</span>
      </p>

      <div className="client-logos-viewport">
        <ul className="client-logos-track">
          {loop.map((client, index) => (
            <li
              key={`${client.file}-${index}`}
              className="client-logo-item"
              aria-hidden={index >= clientLogos.length ? "true" : undefined}
            >
              <img
                src={getMediaUrl(`/logos/${client.file}`)}
                alt={index < clientLogos.length ? client.name : ""}
                className={`client-logo-img ${client.large ? "is-large" : ""}`}
                height={client.large ? 110 : 80}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
