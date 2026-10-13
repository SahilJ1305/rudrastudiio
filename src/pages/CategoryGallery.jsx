import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  Camera,
  Expand,
  ArrowLeft,
  ArrowRight,
  Images,
  Calendar
} from "lucide-react";
import PageHero from "../components/PageHero";
import Lightbox from "../components/Lightbox";
import CategoryCard from "../components/CategoryCard";
import CTASection from "../components/CTASection";

import { categories, getCategoryById } from "../data/categories";
import { getPhotosByCategory } from "../data/galleryData";
import { getThumbUrl } from "../utils/mediaUrl";
import "./CategoryGallery.css";

export default function CategoryGallery() {
  const { category: categorySlug } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Lookup current category
  const currentCategory = useMemo(() => {
    return getCategoryById(categorySlug);
  }, [categorySlug]);

  // Photos belonging to this category
  const photos = useMemo(() => {
    if (!currentCategory) return [];
    return getPhotosByCategory(currentCategory.id);
  }, [currentCategory]);

  // Other categories for "Explore More Categories" section
  const otherCategories = useMemo(() => {
    if (!currentCategory) return categories;
    return categories.filter((c) => c.id !== currentCategory.id);
  }, [currentCategory]);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // If invalid category slug
  if (!currentCategory) {
    return (
      <div className="cat-gallery-notfound container section-padding">
        <div className="notfound-card">
          <Camera size={44} className="notfound-icon" />
          <h2>Category Not Found</h2>
          <p>The photography collection you requested does not exist or has been relocated.</p>
          <Link to="/gallery" className="btn btn-gold">
            <ArrowLeft size={16} />
            <span>Return to Gallery</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="category-gallery-root">
      <PageHero
        eyebrow="Album"
        title={currentCategory.name}
        subtitle={currentCategory.tagline || currentCategory.shortDesc}
        image={currentCategory.coverImage}
        imageAlt={currentCategory.name}
      >
        <div className="category-action-bar">
          <Link to="/contact" className="btn btn-gold cat-book-btn">
            <Calendar size={16} />
            <span>Book a {currentCategory.name} Shoot</span>
          </Link>

          <span className="cat-photo-counter-tag">
            <Images size={15} />
            <span>{photos.length} photographs</span>
          </span>
        </div>
      </PageHero>

      {/* Breadcrumb strip: Home → Gallery → [Category Name] */}
      <div className="category-crumb-strip">
        <div className="container category-crumb-inner">
          <nav className="category-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/" className="crumb-link">Home</Link>
            <ChevronRight size={14} className="crumb-arrow" />
            <Link to="/gallery" className="crumb-link">Gallery</Link>
            <ChevronRight size={14} className="crumb-arrow" />
            <span className="crumb-current" aria-current="page">{currentCategory.name}</span>
          </nav>

          <Link to="/gallery" className="crumb-back-link">
            <ArrowLeft size={15} />
            <span>All albums</span>
          </Link>
        </div>
      </div>

      {/* Main Image Grid for This Category */}
      <section className="category-photos-section">
        <div className="container">
          <div className="cat-section-header">
            <div className="header-left">
              <span className="eyebrow">{currentCategory.accent || "The Collection"}</span>
              <h2 className="cat-section-title">The Collection</h2>
            </div>
            <div className="header-right">
              {currentCategory.description && (
                <p className="cat-section-subtitle">{currentCategory.description}</p>
              )}
            </div>
          </div>

          <div className="category-photos-grid">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                className="cat-photo-tile"
                style={{ aspectRatio: photo.aspectRatio }}
                onClick={() => handleOpenLightbox(index)}
                aria-label={`Open photo ${index + 1} of ${photos.length}`}
              >
                <img
                  src={getThumbUrl(photo.url, 700)}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                />
                <span className="cat-photo-icon" aria-hidden="true">
                  <Expand size={16} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More Categories Section */}
      <section className="explore-more-section section-padding">
        <div className="container">
          <div className="explore-more-header">
            <div>
              <span className="eyebrow">Continue browsing</span>
              <h2 className="explore-more-title">More albums</h2>
            </div>
            <Link to="/gallery" className="btn btn-outline">
              <span>View All {categories.length} Albums</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="explore-more-grid">
            {otherCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={photos}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Call to Action */}
      <CTASection 
        heading={`Ready For Your ${currentCategory.name}?`}
        subtext={`Every chapter of your life deserves to be celebrated. Contact our concierge to review package offerings, concept moodboards, and availability.`}
        primaryBtnText="Reserve Your Date"
        primaryBtnLink="/contact"
        secondaryBtnText="Explore Other Categories"
        secondaryBtnLink="/gallery"
      />
    </div>
  );
}
