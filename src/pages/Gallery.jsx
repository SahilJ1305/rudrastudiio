import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Expand } from "lucide-react";
import PageHero from "../components/PageHero";
import Lightbox from "../components/Lightbox";
import CTASection from "../components/CTASection";

import { categories } from "../data/categories";
import { galleryPhotos } from "../data/galleryData";
import { getThumbUrl } from "../utils/mediaUrl";
import "./Gallery.css";

const photosByAlbum = categories.reduce((acc, c) => {
  acc[c.id] = galleryPhotos.filter((p) => p.categoryId === c.id);
  return acc;
}, {});

// Pick 5 photos: a landscape feature (wide tile) plus 4 others, favouring variety.
function pickMosaic(photos) {
  if (photos.length <= 5) return photos;
  const feature = photos.find((p) => p.orientation === "landscape") || photos[0];
  const rest = photos.filter((p) => p.id !== feature.id);
  const portraits = rest.filter((p) => p.orientation === "portrait");
  const others = rest.filter((p) => p.orientation !== "portrait");
  const picks = [];
  let i = 0;
  while (picks.length < 4 && (i < portraits.length || i < others.length)) {
    if (i < portraits.length && picks.length < 4) picks.push(portraits[i]);
    if (i < others.length && picks.length < 4) picks.push(others[i]);
    i += 1;
  }
  return [feature, ...picks];
}

const mosaics = categories.reduce((acc, c) => {
  acc[c.id] = pickMosaic(photosByAlbum[c.id]);
  return acc;
}, {});

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState({ open: false, photos: [], index: 0 });

  const openLightbox = (photos, photo) => {
    const index = Math.max(0, photos.findIndex((p) => p.id === photo.id));
    setLightbox({ open: true, photos, index });
  };

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeFilter) || null,
    [activeFilter]
  );
  const activePhotos = activeCategory ? photosByAlbum[activeCategory.id] : [];

  return (
    <div className="gallery-page-root">
      <PageHero
        eyebrow="Portfolio"
        title="Our Gallery"
        subtitle="Stories captured across moments and celebrations. Every photograph is a collaboration of light, emotion and lasting memory."
        image="/Images/wedding/RUDRA0549.JPG"
        imageAlt="Wedding photograph by Rudra Studiio"
      />

      <div className="gallery-filter-bar">
        <div className="container">
          <div className="gallery-pills" role="toolbar" aria-label="Filter photos by album">
            <button
              type="button"
              className={`gallery-pill ${activeFilter === "all" ? "active" : ""}`}
              aria-pressed={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            >
              <span>All</span>
              <span className="gallery-pill-count">{galleryPhotos.length}</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`gallery-pill ${activeFilter === cat.id ? "active" : ""}`}
                aria-pressed={activeFilter === cat.id}
                onClick={() => setActiveFilter(cat.id)}
              >
                <span>{cat.name.replace(" Photography", "")}</span>
                <span className="gallery-pill-count">{photosByAlbum[cat.id].length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeCategory ? (
        <section className="gallery-single">
          <div className="container">
            <header className="gallery-single-head">
              <div>
                <span className="eyebrow">Album</span>
                <h2 className="gallery-single-title">{activeCategory.name}</h2>
                <p className="gallery-single-tag">{activeCategory.tagline}</p>
              </div>
              <Link to={`/gallery/${activeCategory.slug || activeCategory.id}`} className="gallery-album-link">
                <span>Open album page</span>
                <ArrowRight size={15} />
              </Link>
            </header>

            <div className="gallery-masonry">
              {activePhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  className="gallery-tile"
                  style={{ aspectRatio: photo.aspectRatio }}
                  onClick={() => openLightbox(activePhotos, photo)}
                  aria-label={`Open photo from ${activeCategory.name}`}
                >
                  <img
                    src={getThumbUrl(photo.url, 700)}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gallery-tile-icon" aria-hidden="true">
                    <Expand size={16} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : (
        categories.map((cat, i) => {
          const mosaic = mosaics[cat.id];
          if (!mosaic.length) return null;
          const albumPhotos = photosByAlbum[cat.id];
          return (
            <section
              key={cat.id}
              className={`album-section ${i % 2 === 0 ? "tone-a" : "tone-b"} ${i % 2 === 1 ? "mirror" : ""}`}
            >
              <div className="container album-section-inner">
                <div className="album-info">
                  <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="album-name">{cat.name}</h2>
                  <p className="album-tagline">{cat.shortDesc}</p>
                  <p className="album-count">{albumPhotos.length} photographs</p>
                  <Link to={`/gallery/${cat.slug || cat.id}`} className="album-link">
                    <span>View album</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>

                <div className="album-mosaic">
                  {mosaic.map((photo, idx) => (
                    <button
                      key={photo.id}
                      type="button"
                      className={`mosaic-tile ${idx === 0 ? "mosaic-feature" : ""}`}
                      onClick={() => openLightbox(albumPhotos, photo)}
                      aria-label={`Open photo from ${cat.name}`}
                    >
                      <img
                        src={getThumbUrl(photo.url, 700)}
                        alt={photo.title}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          );
        })
      )}

      <Lightbox
        isOpen={lightbox.open}
        onClose={() => setLightbox((s) => ({ ...s, open: false }))}
        photos={lightbox.photos}
        currentIndex={lightbox.index}
        onNavigate={(index) => setLightbox((s) => ({ ...s, index }))}
      />

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
