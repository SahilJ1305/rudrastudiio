import React, { useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getFullsizeUrl } from "../utils/mediaUrl";
import "./Lightbox.css";

export default function Lightbox({
  isOpen,
  onClose,
  photos = [],
  currentIndex = 0,
  onNavigate
}) {
  const currentPhoto = photos[currentIndex];
  const closeBtnRef = useRef(null);

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

    const previouslyFocused = document.activeElement;
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    if (closeBtnRef.current) closeBtnRef.current.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      {/* Top Bar with Counter and Close Button */}
      <div className="lightbox-topbar" onClick={(e) => e.stopPropagation()}>
        <button 
          ref={closeBtnRef}
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
            src={getFullsizeUrl(currentPhoto.url)} 
            alt={currentPhoto.title || "Rudra Studiio photograph"} 
            className="lightbox-active-img"
          />
        </div>

        <div className="lightbox-caption-bar">
          <h3 className="caption-title">{currentPhoto.title}</h3>
          <div className="lightbox-counter">
            <span className="counter-current">{currentIndex + 1}</span>
            <span className="counter-sep">/</span>
            <span className="counter-total">{photos.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
