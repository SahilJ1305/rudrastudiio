import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./CategoryCard.css";

export default function CategoryCard({ category, size = "normal" }) {
  if (!category) return null;

  return (
    <Link 
      to={`/gallery/${category.slug || category.id}`} 
      className={`category-card-root card-size-${size}`}
      aria-label={`Explore ${category.name}`}
    >
      <div className="card-media-wrap">
        <img 
          src={category.coverImage} 
          alt={category.name} 
          loading="lazy"
          className="card-bg-img"
        />
        <div className="card-gradient-vignette"></div>
        <div className="card-glow-border"></div>
      </div>

      <div className="card-content-overlay">
        {/* Bottom Details */}
        <div className="card-bottom-details">
          <div className="card-text-group">
            <h3 className="card-category-name">{category.name}</h3>
            <p className="card-short-desc">{category.shortDesc || category.description}</p>
          </div>

          <div className="card-action-circle">
            <ArrowRight size={20} className="card-arrow" />
          </div>
        </div>
      </div>
    </Link>
  );
}
