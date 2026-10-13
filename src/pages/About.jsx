import React from "react";
import PageHero from "../components/PageHero";
import StatsCounter from "../components/StatsCounter";
import CTASection from "../components/CTASection";

import { studioStats, studioPhilosophy } from "../data/team";
import { studio } from "../data/studio";
import { getThumbUrl, getFullsizeUrl } from "../utils/mediaUrl";
import "./About.css";

const FOUNDER_IMAGE = "/Images/team/laxman-jagtap.png";
const GROUP_IMAGE = "/Images/Group image.jpeg";

export default function About() {
  return (
    <div className="about-page-root">
      {/* 1. Page header */}
      <PageHero
        eyebrow="About Rudra Studio"
        title="We Capture Purpose"
        subtitle="Every moment has a story. Every brand has a purpose. At Rudra Studio, Hadapsar, Pune, we transform special moments and powerful business stories into memorable photographs and films."
        image="/Images/baby/231A0695 copy.jpg"
        imageAlt="Baby portrait by Rudra Studio"
      />

      {/* 2. Our Story Section */}
      <section className="about-story-section section-padding">
        <div className="container">
          <div className="story-grid">
            <div className="story-image-wrap">
              <img
                src={getThumbUrl(FOUNDER_IMAGE, 800)}
                srcSet={`${getThumbUrl(FOUNDER_IMAGE, 800)} 800w, ${getFullsizeUrl(FOUNDER_IMAGE)} 864w`}
                sizes="(max-width: 960px) 100vw, 45vw"
                alt={`${studio.founder}, founder of Rudra Studio`}
                className="story-main-img story-founder-img"
                loading="lazy"
              />
              <div className="story-accent-card">
                <span className="accent-est">STUDIO FOUNDER</span>
                <p className="accent-quote">{studio.founder}</p>
              </div>
            </div>

            <div className="story-text-column">
              <span className="eyebrow">Our Story</span>
              <h2 className="story-heading">Photography and Films Under One Roof</h2>
              <p className="story-p">
                Rudra Studio is a photography and videography studio in Hadapsar, Pune, founded by {studio.founder}. We cover weddings and pre-weddings, kids, maternity and sports, events, conferences and stage shows, as well as product, corporate and industrial work.
              </p>
              <p className="story-p">
                We offer customized packages for different requirements and bring a professional approach to every project, from a family celebration to a company profile film.
              </p>
              <p className="story-p">
                Our services reach across India for large weddings and events.
              </p>

              <div className="story-stats-inline">
                <div className="inline-stat-item">
                  <span className="stat-gold">Pune</span>
                  <span className="stat-label">Studio in Hadapsar</span>
                </div>
                <div className="inline-stat-item">
                  <span className="stat-gold">India</span>
                  <span className="stat-label">Weddings &amp; events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Studio Stats Section (Animated Counters) */}
      <section className="about-stats-section">
        <div className="container">
          <div className="stats-glass-container">
            <div className="stats-grid">
              {studioStats.map((stat, idx) => (
                <div key={idx} className="stat-column">
                  <StatsCounter 
                    targetValue={stat.value} 
                    suffix={stat.suffix} 
                    duration={2200}
                  />
                  <h3 className="stat-title">{stat.label}</h3>
                  <p className="stat-subtext">{stat.subtext}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Philosophy Section */}
      <section className="philosophy-section section-padding">
        <div className="container">
          <div className="philosophy-content-wrap">
            <span className="eyebrow">The Core Ethos</span>
            <blockquote className="philosophy-quote">
              "{studioPhilosophy.quote}"
            </blockquote>
            <p className="philosophy-body">
              {studioPhilosophy.extended}
            </p>
            <div className="philosophy-signature-row">
              <div className="gold-accent-dot"></div>
              <span>{studio.founder} — Studio Founder</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Behind the Lens: one group photo of the team */}
      <section className="team-section section-padding">
        <div className="container">
          <div className="team-feature">
            <div className="team-feature-text">
              <span className="eyebrow">The Team</span>
              <h2 className="team-heading">Behind The Lens</h2>
              <p>
                The people behind every photograph and film at Rudra Studio, working together to capture your moments and your story.
              </p>
              <p className="team-founder">
                <strong>{studio.founder}</strong>
                <span>Studio Founder</span>
              </p>
            </div>

            <figure className="team-photo-frame">
              <img
                src={getFullsizeUrl(GROUP_IMAGE)}
                alt="The Rudra Studio team"
                className="team-photo"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTASection
        heading="Let's Create Something Meaningful."
        subtext="Contact Rudra Studio to discuss your project, check availability and receive a customized quotation."
        secondaryBtnText="Explore Our Portfolio"
        secondaryBtnLink="/gallery"
      />
    </div>
  );
}
