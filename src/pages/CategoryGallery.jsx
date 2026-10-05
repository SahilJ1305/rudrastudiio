import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronRight, 
  Sparkles, 
  Camera, 
  Eye, 
  ArrowLeft, 
  ArrowRight, 
  Images, 
  Calendar,
  MapPin,
  User
} from "lucide-react";
import Lightbox from "../components/Lightbox";
import CategoryCard from "../components/CategoryCard";
import CTASection from "../components/CTASection";

import { categories, getCategoryById } from "../data/categories";
import { getPhotosByCategory } from "../data/galleryData";
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
    if (!currentCategory) return categories.slice(0, 3);
    return categories
      .filter((c) => c.id !== currentCategory.id)
      .slice(0, 3);
  }, [currentCategory]);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // If invalid category slug
  if (!currentCategory) {
    return (
      <div className="cat-gallery-notfound container section-padding">
        <div className="notfound-card glass-panel">
          <Camera size={44} className="gold-spark" />
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
      {/* Category Hero Banner */}
      <section className="category-hero-banner">
        <div className="category-banner-bg">
          <img 
            src={currentCategory.coverImage} 
            alt={currentCategory.name} 
            className="category-bg-photo"
          />
          <div className="category-banner-vignette"></div>
        </div>

        <div className="container category-banner-content">
          {/* Breadcrumb: Home → Gallery → [Category Name] */}
          <nav className="category-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/" className="crumb-link">Home</Link>
            <ChevronRight size={14} className="crumb-arrow" />
            <Link to="/gallery" className="crumb-link">Gallery</Link>
            <ChevronRight size={14} className="crumb-arrow" />
            <span className="crumb-current">{currentCategory.name}</span>
          </nav>

          <div className="category-badge-pill">
            <Sparkles size={13} className="spark-gold" />
            <span>{currentCategory.accent || "FINE ART COLLECTION"}</span>
          </div>

          <h1 className="category-title">{currentCategory.name}</h1>

          <p className="category-tagline">
            "{currentCategory.tagline || currentCategory.shortDesc}"
          </p>

          <p className="category-description">
            {currentCategory.description}
          </p>

          <div className="category-action-bar">
            <Link to="/contact" className="btn btn-gold cat-book-btn">
              <Calendar size={16} />
              <span>Book a {currentCategory.name} Shoot</span>
            </Link>

            <span className="cat-photo-counter-tag">
              <Images size={15} />
              <span>{photos.length} Curated High-Resolution Frames</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Image Grid for This Category */}
      <section className="category-photos-section section-padding">
        <div className="container">
          <div className="cat-section-header">
            <div className="header-left">
              <h2 className="cat-section-title">The Collection</h2>
              <p className="cat-section-subtitle">
                Click any photograph below to view in full-screen cinematic resolution with metadata.
              </p>
            </div>

            <div className="header-right">
              <Link to="/gallery" className="btn btn-outline back-gallery-btn">
                <ArrowLeft size={16} />
                <span>All Categories</span>
              </Link>
            </div>
          </div>

          <div className="category-photos-grid">
            {photos.map((photo, index) => (
              <div 
                key={photo.id}
                className={`cat-photo-card orient-${photo.orientation}`}
                onClick={() => handleOpenLightbox(index)}
              >
                <div className="cat-photo-wrapper">
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    loading="lazy" 
                    className="cat-photo-img"
                  />

                  <div className="cat-photo-overlay">
                    <div className="photo-card-top">
                      <span className="photo-num-badge">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="photo-card-bottom">
                      <h4 className="photo-card-title">{photo.title}</h4>
                      {photo.client && (
                        <p className="photo-card-meta">
                          <User size={12} className="meta-icon" /> {photo.client}
                        </p>
                      )}
                      {photo.location && (
                        <p className="photo-card-meta">
                          <MapPin size={12} className="meta-icon" /> {photo.location}
                        </p>
                      )}
                      <span className="cat-photo-action">
                        <Eye size={14} /> View Lightbox
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More Categories Section */}
      <section className="explore-more-section section-padding">
        <div className="container">
          <div className="explore-more-header">
            <div>
              <span className="badge-gold">CONTINUE BROWSING</span>
              <h2 className="explore-more-title">Explore More Categories</h2>
            </div>
            <Link to="/gallery" className="btn btn-outline">
              <span>View All 10 Categories</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="explore-more-grid">
            {otherCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} size="normal" />
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
