import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  Camera, 
  Play, 
  Award, 
  HeartHandshake, 
  Aperture, 
  Clock, 
  Eye, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import CategoryCard from "../components/CategoryCard";
import Lightbox from "../components/Lightbox";
import VideoModal from "../components/VideoModal";
import GoogleReviews from "../components/GoogleReviews";
import CTASection from "../components/CTASection";
import ClientMarquee from "../components/ClientMarquee";
import { YoutubeIcon } from "../components/SocialIcons";

import { categories } from "../data/categories";
import { getFeaturedPhotos } from "../data/galleryData";
import { studioVideos, YOUTUBE_CHANNEL_URL } from "../data/videos";
import { useBooking } from "../context/BookingContext";
import "./Home.css";

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { openBookingModal } = useBooking();

  const featuredPhotos = getFeaturedPhotos();

  const handleOpenLightbox = (index) => {
    setCurrentPhotoIdx(index);
    setLightboxOpen(true);
  };

  const handleOpenVideo = (video) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  return (
    <div className="home-page-root">
      {/* =========================================================================
          1. HERO SECTION (Continuous Loop Nature Video + Bottom Left Alignment)
          ========================================================================= */}
      <section className="hero-section hero-bottom-left-layout">
        <div className="hero-bg-container">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            poster="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2000&q=80"
            className="hero-video-loop"
          >
            <source 
              src="https://cdn.coverr.co/videos/coverr-sunlight-through-the-trees-in-a-forest-4796/1080p.mp4" 
              type="video/mp4" 
            />
          </video>
          <div className="hero-cinematic-overlay"></div>
        </div>

        <div className="container hero-content-wrapper">
          <div className="hero-bottom-left-card">
            <h1 className="hero-main-title">
              We Capture Moments.<br />
              <span className="gold-gradient-text">You Keep Them Forever.</span>
            </h1>

            <p className="hero-description">
              From intimate celebrations to grand occasions, we turn your most meaningful moments into timeless photographs.
            </p>

            <div className="hero-cta-group">
              <button 
                onClick={() => openBookingModal()} 
                className="btn btn-gold hero-primary-btn"
                aria-label="Book a Shoot"
              >
                <Sparkles size={18} />
                <span>Book a Shoot</span>
                <ArrowRight size={17} />
              </button>

              <Link to="/gallery" className="btn btn-outline hero-secondary-btn">
                <Camera size={18} />
                <span>Explore Our Work</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR TOP CLIENTS - MOVING LOGO LINE (Pauses on hover with popup)
          ========================================================================= */}
      <ClientMarquee />

      {/* =========================================================================
          2. INTRODUCTION SECTION ("YOUR STORY. OUR LENS.")
          ========================================================================= */}
      <section className="intro-section section-padding">
        <div className="container intro-container">
          <div className="intro-grid">
            {/* Left Image Side */}
            <div className="intro-media-column">
              <div className="intro-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80" 
                  alt="Fine Art Portraiture" 
                  className="intro-main-image"
                  loading="lazy"
                />
                <div className="intro-badge-card">
                  <div className="intro-badge-icon">
                    <Aperture size={22} />
                  </div>
                  <div>
                    <h5 className="intro-badge-title">Mastery of Light</h5>
                    <p className="intro-badge-sub">Fine Art Editorial Aesthetics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Side */}
            <div className="intro-text-column">
              <div className="section-badge-wrapper">
                <span className="badge-gold">THE RUDRA PHILOSOPHY</span>
              </div>

              <h2 className="intro-heading">
                YOUR STORY.<br />
                <span className="gold-gradient-text">OUR LENS.</span>
              </h2>

              <p className="intro-lead-text">
                "Photography is more than taking pictures. It is about preserving emotions, relationships and moments that can never happen the same way twice."
              </p>

              <p className="intro-body-text">
                At Rudra Studiio, every assignment is an unhurried artistic journey. We do not manufacture poses; we curate an atmosphere of trust and intimacy where spontaneous smiles, tearful toasts, and effortless connections bloom naturally.
              </p>

              <div className="intro-features-list">
                <div className="intro-feature-item">
                  <CheckCircle2 size={18} className="feature-check" />
                  <span>Candid, unscripted moments full of genuine emotion</span>
                </div>
                <div className="intro-feature-item">
                  <CheckCircle2 size={18} className="feature-check" />
                  <span>Archival 35mm film-inspired tones and heirloom prints</span>
                </div>
                <div className="intro-feature-item">
                  <CheckCircle2 size={18} className="feature-check" />
                  <span>State-of-the-art studio lofts & global destination readiness</span>
                </div>
              </div>

              <div className="intro-cta-row">
                <Link to="/about" className="btn btn-outline">
                  <span>Discover Our Story</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PHOTOGRAPHY CATEGORIES SECTION (10 Categories)
          ========================================================================= */}
      <section className="categories-section section-padding">
        <div className="container">
          <SectionTitle 
            badge="10 DEDICATED DISCIPLINES"
            title={<>Explore Our <span className="gold-gradient-text">Photography</span></>}
            subtitle="Every moment deserves to be beautifully captured. Select any category below to immerse yourself in dedicated collections."
          />

          {/* Dynamic Grid Layout for 10 Categories */}
          <div className="categories-dynamic-grid">
            {categories.map((cat, index) => {
              // Assign distinct sizes for visual rhythm
              let size = "normal";
              if (index === 0) size = "wide";
              else if (index === 1 || index === 6) size = "tall";
              else if (index === 7) size = "wide";

              return (
                <CategoryCard 
                  key={cat.id} 
                  category={cat} 
                  size={size} 
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FEATURED WORK SECTION (Editorial Masonry + Fullscreen Lightbox)
          ========================================================================= */}
      <section className="featured-section section-padding">
        <div className="container">
          <SectionTitle 
            badge="CURATED SHOWCASE"
            title={<>A Glimpse <span className="gold-gradient-text">Through Our Lens</span></>}
            subtitle="A curated selection of our most poignant frames across weddings, high fashion, intimate portraits, and timeless family milestones."
          />

          <div className="featured-masonry-grid">
            {featuredPhotos.map((photo, index) => (
              <div 
                key={photo.id} 
                className={`featured-photo-item photo-orient-${photo.orientation}`}
                onClick={() => handleOpenLightbox(index)}
              >
                <div className="featured-img-wrap">
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    loading="lazy"
                    className="featured-image"
                  />
                  <div className="featured-overlay">
                    <div className="featured-overlay-badge">
                      <Camera size={14} />
                      <span>{photo.categoryId.toUpperCase()}</span>
                    </div>

                    <div className="featured-overlay-bottom">
                      <h4 className="featured-photo-title">{photo.title}</h4>
                      <p className="featured-photo-client">{photo.client || photo.location}</p>
                      <span className="featured-view-action">
                        <Eye size={15} /> View Photo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="featured-more-cta">
            <Link to="/gallery" className="btn btn-outline">
              <span>View Complete 100+ Gallery</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. BEHIND THE LENS - YOUTUBE SHOWCASE (Playable on site + Channel Button)
          ========================================================================= */}
      <section className="videos-section section-padding">
        <div className="container">
          <div className="videos-header-flex">
            <div className="videos-header-text">
              <SectionTitle 
                title={<>Cinematic Stories on <span className="gold-gradient-text">YouTube</span></>}
                subtitle="Watch our highlight films, wedding teasers, and newborn stories playable right here on our site, or visit our official YouTube channel @rudrastudiio."
              />
            </div>
            
            <div className="videos-header-cta-wrap">
              <a 
                href={YOUTUBE_CHANNEL_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn youtube-channel-cta-btn"
                aria-label="Visit Rudra Studiio YouTube Channel"
              >
                <YoutubeIcon size={20} className="youtube-btn-icon" />
                <span>Visit YouTube Channel</span>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className="videos-grid">
            {studioVideos.map((video) => (
              <div 
                key={video.id} 
                className="video-card"
                onClick={() => handleOpenVideo(video)}
              >
                <div className="video-thumb-wrap">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="video-thumb-img"
                    loading="lazy" 
                  />
                  <div className="video-thumb-vignette"></div>
                  
                  {/* Play Button with pulsing ripple */}
                  <div className="video-play-btn-circle" title="Play Video on Site">
                    <div className="play-pulse-ring"></div>
                    <Play size={22} className="play-triangle-icon" />
                  </div>

                  <span className="video-playable-tag">▶ Play on Site</span>
                  <span className="video-duration-pill">{video.duration}</span>
                </div>

                <div className="video-card-body">
                  <div className="video-card-meta">
                    <span className="video-cat-label">{video.category}</span>
                    <span className="video-quality-tag">4K Film</span>
                  </div>
                  <h3 className="video-card-title">{video.title}</h3>
                  <p className="video-card-desc">{video.description}</p>

                  <div className="video-card-footer-action">
                    <span className="card-play-action-text">
                      <Play size={13} /> Click to Play on Site
                    </span>
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-yt-direct-link"
                      onClick={(e) => e.stopPropagation()}
                      title="Open in YouTube"
                    >
                      <YoutubeIcon size={14} />
                      <span>YouTube</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube Channel Banner Strip */}
          <div className="youtube-channel-strip">
            <div className="yt-strip-left">
              <div className="yt-strip-icon-circle">
                <YoutubeIcon size={26} />
              </div>
              <div>
                <h4 className="yt-strip-title">Rudra Studiio Official YouTube Channel</h4>
                <p className="yt-strip-desc">
                  Subscribe to @rudrastudiio for full wedding feature films, cinematic pre-wedding love stories, and studio insights.
                </p>
              </div>
            </div>
            <div className="yt-strip-right">
              <a 
                href={YOUTUBE_CHANNEL_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-gold yt-strip-btn"
              >
                <YoutubeIcon size={18} />
                <span>Explore All Videos</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE US SECTION (4 Features)
          ========================================================================= */}
      <section className="why-us-section section-padding">
        <div className="container">
          <SectionTitle 
            badge="THE RUDRA ADVANTAGE"
            title={<>Why Discerning Clients <span className="gold-gradient-text">Choose Us</span></>}
            subtitle="Uncompromising artistry, state-of-the-art optical engineering, and white-glove client dedication at every step."
          />

          <div className="why-us-grid">
            {/* Feature 1 */}
            <div className="why-card glass-card">
              <div className="why-icon-box">
                <Clock size={28} />
              </div>
              <h3 className="why-title">10+ Years of Experience</h3>
              <p className="why-desc">
                Professional photography backed by years of experience covering high-profile weddings, celebrity portraits, and international luxury campaigns.
              </p>
              <div className="why-footer-tag">Seasoned Craftsmanship</div>
            </div>

            {/* Feature 2 */}
            <div className="why-card glass-card">
              <div className="why-icon-box">
                <HeartHandshake size={28} />
              </div>
              <h3 className="why-title">Creative Storytelling</h3>
              <p className="why-desc">
                We focus on emotions, details and authentic moments. We weave every frame into a cohesive narrative that tells your unique journey.
              </p>
              <div className="why-footer-tag">Pure Emotional Depth</div>
            </div>

            {/* Feature 3 */}
            <div className="why-card glass-card">
              <div className="why-icon-box">
                <Aperture size={28} />
              </div>
              <h3 className="why-title">Professional Equipment</h3>
              <p className="why-desc">
                High-quality equipment and professional lighting. Medium format digital systems, Profoto studio strobes, and anamorphic cinema optics.
              </p>
              <div className="why-footer-tag">Top-Tier Technology</div>
            </div>

            {/* Feature 4 */}
            <div className="why-card glass-card">
              <div className="why-icon-box">
                <Award size={28} />
              </div>
              <h3 className="why-title">Timeless Memories</h3>
              <p className="why-desc">
                Photographs designed to remain meaningful for generations. Master hand-retouching, archival paper printing, and leather-bound heirloom albums.
              </p>
              <div className="why-footer-tag">Enduring Legacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. ABOUT US PREVIEW ("Behind The Camera")
          ========================================================================= */}
      <section className="about-preview-section section-padding">
        <div className="container">
          <div className="about-preview-card glass-panel">
            <div className="about-preview-grid">
              <div className="about-preview-text">
                <span className="badge-gold">BEHIND THE CAMERA</span>
                <h2 className="about-preview-heading">
                  Passionate Storytellers <br />
                  <span className="gold-gradient-text">Behind Every Frame</span>
                </h2>
                <p className="about-preview-body">
                  Rudra Studiio was founded with a singular conviction: that photographs are not mere decorations, but sacred portals back into the happiest moments of your life. 
                </p>
                <p className="about-preview-body">
                  Our team brings together award-winning photojournalists, fashion colorists, and fine-art portraitists who share an obsession with light, shadow, and honest human emotion.
                </p>

                <div className="about-preview-quote">
                  <p>"We don't just shoot how it looks. We capture how it felt."</p>
                  <span>— Rudra Sharma, Master Photographer</span>
                </div>

                <Link to="/about" className="btn btn-gold about-learn-btn">
                  <span>Learn More About Our Studio</span>
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="about-preview-visual">
                <div className="about-img-frame">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80" 
                    alt="Rudra Studiio Master Photographer" 
                    className="about-preview-img"
                    loading="lazy"
                  />
                  <div className="about-visual-overlay"></div>
                  <div className="about-floating-stat">
                    <span className="stat-number">12+</span>
                    <span className="stat-label">Years of Craft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. GOOGLE REVIEWS SECTION (Pune Studio Location & Verified Reviews)
          ========================================================================= */}
      <GoogleReviews />

      {/* =========================================================================
          9. CALL TO ACTION SECTION
          ========================================================================= */}
      <CTASection />

      {/* Lightbox Modal */}
      <Lightbox 
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={featuredPhotos}
        currentIndex={currentPhotoIdx}
        onNavigate={(newIdx) => setCurrentPhotoIdx(newIdx)}
      />

      {/* Video Modal Player */}
      <VideoModal 
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        video={selectedVideo}
      />
    </div>
  );
}
