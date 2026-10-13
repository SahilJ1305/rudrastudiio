import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getThumbUrl } from "../utils/mediaUrl";
import "./CategoryCard.css";

/** Small album card: cover image with the album name beneath. */
export default function CategoryCard({ category }) {
  if (!category) return null;

  return (
    <Link
      to={`/gallery/${category.slug || category.id}`}
      className="category-card-root"
      aria-label={`Explore ${category.name}`}
    >
      <div className="card-media-wrap">
        <img
          src={getThumbUrl(category.coverImage, 600)}
          alt={category.name}
          loading="lazy"
          decoding="async"
          className="card-bg-img"
        />
      </div>
      <div className="card-label">
        <h3 className="card-category-name">{category.name}</h3>
        <ArrowRight size={16} className="card-arrow" />
      </div>
    </Link>
  );
}
