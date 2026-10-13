import React, { useEffect, useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { YoutubeIcon } from "./SocialIcons";
import { studioVideos, YOUTUBE_CHANNEL_URL } from "../data/videos";
import "./CinemaStories.css";

// Starts with the thumbnail every video has (last in the list), then quietly upgrades to a bigger
// one if it exists. YouTube answers a missing size with a tiny grey placeholder, so check the width.
function FilmImage({ sources, alt, className }) {
  const fallback = sources[sources.length - 1];
  const [src, setSrc] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const candidate of sources.slice(0, -1)) {
        const ok = await new Promise((resolve) => {
          const probe = new Image();
          probe.onload = () => resolve(probe.naturalWidth > 200);
          probe.onerror = () => resolve(false);
          probe.src = candidate;
        });
        if (cancelled) return;
        if (ok) {
          setSrc(candidate);
          return;
        }
      }
    })();
    return () => { cancelled = true; };
  }, [sources]);

  return <img src={src} alt={alt} className={className} decoding="async" />;
}

/**
 * "Cinematic Stories": a dark screening-room band. The big screen plays the chosen film
 * in place (YouTube), the numbered reel on the right switches films.
 */
export default function CinemaStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const film = studioVideos[activeIndex];

  const selectFilm = (index) => {
    setActiveIndex(index);
    setPlaying(true);
  };

  return (
    <section className="cinema">
      <div
        className="cinema-ambient"
        style={{ backgroundImage: `url(${film.thumbnail})` }}
        aria-hidden="true"
      />
      <div className="cinema-ambient-shade" aria-hidden="true" />

      <div className="container cinema-inner">
        <header className="cinema-head">
          <div>
            <span className="cinema-eyebrow">Now Showing</span>
            <h2 className="cinema-title">Cinematic Stories</h2>
            <p className="cinema-lead">
              Wedding films, pre-wedding stories and celebrations, shot and edited by our team and shared on our YouTube channel.
            </p>
          </div>
          <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="cinema-channel-btn">
            <YoutubeIcon size={18} />
            <span>Visit our YouTube channel</span>
            <ArrowUpRight size={15} />
          </a>
        </header>

        <div className="cinema-layout">
          {/* The screen */}
          <div className="cinema-screen-wrap">
            <div className="cinema-perforations" aria-hidden="true" />
            <div className="cinema-screen">
              {playing ? (
                <iframe
                  key={film.id}
                  className="cinema-player"
                  src={film.youtubeEmbedUrl}
                  title={film.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <button type="button" className="cinema-poster" onClick={() => setPlaying(true)} aria-label={`Play ${film.title}`}>
                  <FilmImage key={film.id} sources={film.thumbnailSources} alt="" className="cinema-poster-img" />
                  <span className="cinema-poster-shade" />
                  <span className="cinema-play">
                    <Play size={34} />
                  </span>
                  <span className="cinema-poster-meta">
                    <span className="cinema-poster-cat">{film.category}</span>
                    <span className="cinema-poster-title">{film.title}</span>
                  </span>
                  <span className="cinema-duration">{film.duration}</span>
                </button>
              )}
            </div>
            <div className="cinema-perforations" aria-hidden="true" />

            <div className="cinema-caption">
              <span className="cinema-caption-label">{playing ? "Playing" : "Featured film"}</span>
              <span className="cinema-caption-title">{film.title}</span>
              <a href={film.watchUrl} target="_blank" rel="noopener noreferrer" className="cinema-caption-link">
                Watch on YouTube <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* The reel */}
          <ol className="cinema-reel" aria-label="Films">
            {studioVideos.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`cinema-reel-item ${index === activeIndex ? "is-active" : ""}`}
                  onClick={() => selectFilm(index)}
                  aria-current={index === activeIndex ? "true" : undefined}
                >
                  <span className="cinema-reel-num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="cinema-reel-thumb">
                    <img src={item.thumbnail} alt="" loading="lazy" decoding="async" />
                    <span className="cinema-reel-play"><Play size={14} /></span>
                  </span>
                  <span className="cinema-reel-text">
                    <span className="cinema-reel-cat">{item.category}</span>
                    <span className="cinema-reel-title">{item.title}</span>
                    <span className="cinema-reel-duration">{item.duration}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
