import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Camera, Check, ChevronDown } from "lucide-react";
import HeroVideoReel from "../components/HeroVideoReel";
import ClientLogos from "../components/ClientLogos";
import CinemaStories from "../components/CinemaStories";
import GoogleReviews from "../components/GoogleReviews";
import CTASection from "../components/CTASection";

import { categories } from "../data/categories";
import { whyChoose } from "../data/services";
import { studio } from "../data/studio";
import { useBooking } from "../context/BookingContext";
import { getThumbUrl } from "../utils/mediaUrl";
import "./Home.css";

// Desktop placement of the 13 album tiles on a 4 x 5 grid (see .glimpse-grid in Home.css):
//   wedding  wedding  pre-wed  pre-wed
//   wedding  wedding  matern.  baby
//   fashion  portrait product  baby
//   fashion  jewel.   food     food
//   interior industr. sports   events
const SHOWCASE_AREAS = {
  wedding: "w", "pre-wedding": "p", maternity: "m", baby: "b",
  fashion: "f", portrait: "c", product: "r", jwellery: "j",
  food: "d", interior: "i", industrial: "n", sports: "s", events: "e"
};

export default function Home() {
  const { openBookingModal } = useBooking();

  return (
    <div className="home">
      {/* 1. HERO: looping forest drone video */}
      <section className="home-hero">
        <HeroVideoReel />
        <div className="home-hero-shade" />

        <div className="container home-hero-content">
          <span className="home-hero-kicker">{studio.name} · {studio.tagline}</span>
          <h1 className="home-hero-title">
            We Capture Moments.
            <span>You Keep Them Forever.</span>
          </h1>
          <p className="home-hero-text">
            From intimate celebrations to grand occasions, we turn your most meaningful moments into timeless
            photographs and films.
          </p>
          <div className="home-hero-actions">
            <button onClick={() => openBookingModal()} className="btn btn-gold">
              <Camera size={18} />
              <span>Book a Shoot</span>
            </button>
            <Link to="/gallery" className="btn home-hero-ghost">
              <span>View Portfolio</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <a href="#home-intro" className="home-hero-scroll" aria-label="Scroll to content">
          <ChevronDown size={22} />
        </a>
      </section>
      <div className="brand-stripe" />

      {/* 2. CLIENT LOGOS: endless horizontal strip */}
      <ClientLogos />

      {/* 3. INTRO */}
      <section id="home-intro" className="home-intro section-padding">
        <div className="container home-intro-grid">
          <div className="home-intro-text">
            <span className="eyebrow">{studio.name} · {studio.tagline}</span>
            <h2 className="home-h2">Every Moment Has a Story. Every Brand Has a Purpose.</h2>
            <p>
              At Rudra Studio, Hadapsar, Pune, we transform special moments and powerful business stories into
              memorable photographs and films.
            </p>
            <div className="home-intro-actions">
              <Link to="/about" className="btn btn-outline">
                <span>About the Studio</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="home-intro-media">
            <img
              src={getThumbUrl("/Images/Prewdding/231A0474 copy.jpg", 800)}
              alt="Pre-wedding couple portrait by Rudra Studio"
              className="home-intro-img home-intro-img-main"
              loading="lazy"
            />
            <img
              src={getThumbUrl("/Images/baby/231A0713 copy.jpg", 800)}
              alt="Family baby photoshoot by Rudra Studio"
              className="home-intro-img home-intro-img-accent"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 4. A GLIMPSE THROUGH OUR LENS: one photo from every album */}
      <section className="home-glimpse section-padding">
        <div className="container">
          <div className="home-section-head">
            <div>
              <span className="eyebrow">Portfolio</span>
              <h2 className="home-h2">A Glimpse Through Our Lens</h2>
            </div>
            <p className="home-section-sub">
              One favourite frame from each of our {categories.length} albums. Open any album to see the full collection.
            </p>
          </div>

          <div className="glimpse-grid">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/gallery/${cat.id}`}
                className={`glimpse-tile ${cat.id === "wedding" ? "tile-large" : ""}`}
                style={{ "--area": SHOWCASE_AREAS[cat.id] || "auto" }}
              >
                <img
                  src={getThumbUrl(cat.coverImage, 800)}
                  alt={cat.name}
                  className="glimpse-img"
                  loading="lazy"
                />
                <div className="glimpse-caption">
                  <span className="glimpse-name">{cat.name}</span>
                  <span className="glimpse-count">
                    {cat.photoCount} photos <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="home-center-action">
            <Link to="/gallery" className="btn btn-outline">
              <span>Browse the Full Gallery</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CINEMATIC STORIES: films from the studio's YouTube channel */}
      <CinemaStories />

      {/* 6. WHY CHOOSE US */}
      <section className="home-why section-padding">
        <div className="container home-why-grid">
          <div className="home-why-head">
            <span className="eyebrow">Why Choose Rudra Studio?</span>
            <h2 className="home-h2">Everything Under One Roof</h2>
          </div>

          <ul className="why-list">
            {whyChoose.map((reason) => (
              <li key={reason} className="why-item">
                <span className="why-check"><Check size={18} strokeWidth={3} /></span>
                <span className="why-item-text">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. GOOGLE REVIEWS */}
      <GoogleReviews />

      {/* 8. CALL TO ACTION */}
      <CTASection />
    </div>
  );
}
