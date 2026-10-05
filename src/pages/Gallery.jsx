import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  Camera, 
  Eye, 
  Layers, 
  MapPin, 
  User,
  Filter
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import Lightbox from "../components/Lightbox";
import CTASection from "../components/CTASection";

import { categories } from "../data/categories";
import { galleryPhotos } from "../data/galleryData";
import "./Gallery.css";

const filterTabs = [
  { id: "all", label: "All Stories" },
  { id: "wedding", label: "Wedding" },
  { id: "pre-wedding", label: "Pre-Wedding" },
  { id: "baby", label: "Baby" },
  { id: "maternity", label: "Maternity" },
  { id: "couple", label: "Couple" },
  { id: "birthday", label: "Birthday" },
  { id: "portrait", label: "Portrait" },
  { id: "fashion", label: "Fashion" },
  { id: "events", label: "Events" },
  { id: "product", label: "Product" }
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filtered photos
  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") return galleryPhotos;
    return galleryPhotos.filter(
      (p) => p.categoryId.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter]);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const currentCategoryData = useMemo(() => {
    if (activeFilter === "all") return null;
    return categories.find((c) => c.id === activeFilter);
  }, [activeFilter]);

  return (
    <div className="gallery-page-root">
      {/* Page Hero Header */}
      <section className="gallery-header-section">
        <div className="container">
          <div className="gallery-hero-text">
            <div className="section-badge-wrapper">
              <span className="badge-gold">
                <Camera size={13} />
                FINE ART ARCHIVE
              </span>
            </div>

            <h1 className="gallery-main-title">
              OUR <span className="gold-gradient-text">GALLERY</span>
            </h1>

            <p className="gallery-subtext">
              Explore stories captured across different moments and celebrations. Every single photograph represents an intimate collaboration of light, emotion, and enduring memory.
            </p>
          </div>

          {/* Filter Pills Bar */}
          <div className="gallery-filter-bar-wrap">
            <div className="filter-bar-header">
              <span className="filter-count-badge">
                <Layers size={13} />
                <span>Showing {filteredPhotos.length} Masterpieces</span>
              </span>

              {activeFilter !== "all" && currentCategoryData && (
                <Link 
                  to={`/gallery/${currentCategoryData.slug || currentCategoryData.id}`} 
                  className="filter-dedicated-link"
                >
                  <span>Go to dedicated {currentCategoryData.name} page</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>

            <div className="gallery-filter-tabs">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`gallery-filter-btn ${isActive ? "active" : ""}`}
                    aria-pressed={isActive}
                  >
                    <span>{tab.label}</span>
                    {tab.id === "all" ? (
                      <span className="tab-badge">{galleryPhotos.length}</span>
                    ) : (
                      <span className="tab-badge">
                        {galleryPhotos.filter(p => p.categoryId === tab.id).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Photo Showcase */}
      <section className="gallery-grid-section">
        <div className="container">
          {filteredPhotos.length === 0 ? (
            <div className="gallery-empty-state">
              <p>No photos available in this category.</p>
            </div>
          ) : (
            <div className="gallery-responsive-masonry">
              {filteredPhotos.map((photo, index) => (
                <div 
                  key={photo.id}
                  className={`gallery-card-item orient-${photo.orientation}`}
                  onClick={() => handleOpenLightbox(index)}
                >
                  <div className="gallery-card-inner">
                    <img 
                      src={photo.url} 
                      alt={photo.title}
                      loading="lazy" 
                      className="gallery-card-img"
                    />

                    {/* Gradient Overlay */}
                    <div className="gallery-card-overlay">
                      <div className="overlay-top">
                        <span className="photo-category-pill">
                          {photo.categoryId.toUpperCase()}
                        </span>
                      </div>

                      <div className="overlay-bottom">
                        <h4 className="photo-title">{photo.title}</h4>
                        {photo.client && (
                          <p className="photo-client">
                            <User size={12} className="inline-icon" /> {photo.client}
                          </p>
                        )}
                        {photo.location && (
                          <p className="photo-location">
                            <MapPin size={12} className="inline-icon" /> {photo.location}
                          </p>
                        )}
                        <span className="view-photo-cta">
                          <Eye size={14} /> Fullscreen Lightbox
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Category Jump Section */}
          <div className="gallery-category-jump-box glass-panel">
            <div className="jump-box-text">
              <span className="badge-gold">DEDICATED CATEGORY GALLERIES</span>
              <h3 className="jump-box-title">Explore Dedicated Category Portfolios</h3>
              <p className="jump-box-desc">
                Looking for a deep dive into an individual discipline? Browse our 10 individual category galleries complete with tailored descriptions, pricing inquiries, and detailed shot lists.
              </p>
            </div>

            <div className="category-jump-pills">
              {categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/gallery/${cat.slug || cat.id}`}
                  className="jump-pill-btn"
                >
                  <span>{cat.name}</span>
                  <ArrowRight size={13} className="pill-arrow" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Call to Action */}
      <CTASection 
        heading="Inspired By What You See?"
        subtext="Let's discuss how we can bring your vision into our frame. Reserve your shoot date today."
        primaryBtnText="Inquire About a Shoot"
        primaryBtnLink="/contact"
        secondaryBtnText="Explore Studio Story"
        secondaryBtnLink="/about"
      />
    </div>
  );
}
