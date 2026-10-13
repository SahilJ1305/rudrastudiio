import React from "react";
import { getFullsizeUrl } from "../utils/mediaUrl";
import "./PageHero.css";

/**
 * Shared header band for inner pages: a studio photo with a dark overlay,
 * eyebrow label, serif title and optional subtitle / extra content.
 */
export default function PageHero({ eyebrow, title, subtitle, image, imageAlt = "", children }) {
  return (
    <section className="page-hero">
      {image && (
        <img src={getFullsizeUrl(image)} alt={imageAlt} className="page-hero-img" />
      )}
      <div className="page-hero-shade" />
      <div className="container page-hero-content">
        {eyebrow && <span className="page-hero-eyebrow">{eyebrow}</span>}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
