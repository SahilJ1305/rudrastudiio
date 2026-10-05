import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles, User } from "lucide-react";
import "./Lightbox.css";

export default function Lightbox({
  isOpen,
  onClose,
  photos = [],
  currentIndex = 0,
  onNavigate
}) {
  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    if (!photos.length) return;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(prevIndex);
  }, [photos, currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (!photos.length) return;
    const nextIndex = (currentIndex + 1) % photos.length;
    onNavigate(nextIndex);
  }, [photos, currentIndex, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      {/* Top Bar with Counter and Close Button */}
      <div className="lightbox-topbar" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-counter">
          <span className="counter-current">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="counter-sep">/</span>
          <span className="counter-total">{String(photos.length).padStart(2, "0")}</span>
        </div>

        <div className="lightbox-category-tag">
          <Sparkles size={14} className="tag-spark" />
          <span>{currentPhoto.categoryId ? currentPhoto.categoryId.toUpperCase() : "RUDRA GALLERY"}</span>
        </div>

        <button 
          className="lightbox-close-btn" 
          onClick={onClose}
          aria-label="Close fullscreen lightbox"
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button 
        className="lightbox-nav-btn prev-btn" 
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous photo"
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        className="lightbox-nav-btn next-btn" 
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next photo"
      >
        <ChevronRight size={32} />
      </button>

      {/* Main Image Stage */}
      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-image-container">
          <img 
            key={currentPhoto.url} 
            src={currentPhoto.url} 
            alt={currentPhoto.title || "Rudra Studiio Masterpiece"} 
            className="lightbox-active-img"
          />
        </div>

        {/* Bottom Metadata Card */}
        <div className="lightbox-caption-bar">
          <div className="caption-text-left">
            <h3 className="caption-title">{currentPhoto.title}</h3>
            {currentPhoto.description && (
              <p className="caption-desc">{currentPhoto.description}</p>
            )}
          </div>

          <div className="caption-meta-right">
            {currentPhoto.client && (
              <div className="meta-pill">
                <User size={14} />
                <span>{currentPhoto.client}</span>
              </div>
            )}
            {currentPhoto.location && (
              <div className="meta-pill">
                <MapPin size={14} />
                <span>{currentPhoto.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
