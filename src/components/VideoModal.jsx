import React, { useEffect } from "react";
import { X, Sparkles, Film } from "lucide-react";
import "./VideoModal.css";

export default function VideoModal({ isOpen, onClose, video }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="video-modal-header">
          <div className="video-header-left">
            <span className="video-badge">
              <Film size={14} />
              {video.category || "CINEMATIC FILM"}
            </span>
            <h3 className="video-modal-title">{video.title}</h3>
          </div>

          <button 
            className="video-modal-close" 
            onClick={onClose}
            aria-label="Close video player"
          >
            <X size={22} />
          </button>
        </div>

        {/* Video Player (Playable directly on site) */}
        <div className="video-player-wrapper">
          {video.youtubeEmbedUrl ? (
            <iframe
              src={video.youtubeEmbedUrl}
              title={video.title}
              className="video-element"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <video 
              src={video.videoUrl} 
              poster={video.thumbnail} 
              controls 
              autoPlay 
              playsInline
              className="video-element"
            >
              Your browser does not support HTML5 video playback.
            </video>
          )}
        </div>

        {/* Modal Footer Description */}
        <div className="video-modal-footer">
          <p className="video-modal-desc">{video.description}</p>
          <div className="video-meta-tag">
            <Sparkles size={14} className="spark-gold" />
            <span>Shot in 4K ProRes Cinematic Color</span>
          </div>
        </div>
      </div>
    </div>
  );
}
