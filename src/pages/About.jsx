import React from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Camera, 
  Heart, 
  CheckCircle, 
  ArrowRight, 
  Award, 
  Compass, 
  Palette, 
  Layers, 
  ShieldCheck 
} from "lucide-react";
import { InstagramIcon } from "../components/SocialIcons";
import SectionTitle from "../components/SectionTitle";
import StatsCounter from "../components/StatsCounter";
import CTASection from "../components/CTASection";

import { teamMembers, studioStats, studioPhilosophy, studioApproach } from "../data/team";
import "./About.css";

export default function About() {
  return (
    <div className="about-page-root">
      {/* 1. Hero Header */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-text">
            <span className="badge-gold">ABOUT RUDRA STUDIIO</span>
            <h1 className="about-main-title">
              Crafting Stories That <br />
              <span className="gold-gradient-text">Defy Time</span>
            </h1>
            <p className="about-hero-sub">
              Founded on the belief that genuine emotion outshines staged perfection. We are a collective of dedicated visual artists, cinematographers, and storytellers.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="about-story-section section-padding">
        <div className="container">
          <div className="story-grid">
            <div className="story-image-wrap">
              <img 
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80" 
                alt="Studio craft and camera lenses" 
                className="story-main-img" 
                loading="lazy"
              />
              <div className="story-accent-card glass-panel">
                <span className="accent-est">ESTABLISHED 2014</span>
                <h4 className="accent-quote">"Light is our paintbrush, emotion is our canvas."</h4>
              </div>
            </div>

            <div className="story-text-column">
              <span className="badge-gold">OUR STORY</span>
              <h2 className="story-heading">From a Darkroom Dream to an International Atelier</h2>
              <p className="story-p">
                Over a decade ago, Rudra Studiio was born in a sun-drenched loft in Mumbai. Armed with a vintage Leica, an uncompromising love for natural chiaroscuro light, and a conviction that modern photography had become too formulaic, our founders set out to redefine portraiture and event storytelling.
              </p>
              <p className="story-p">
                Today, our work spans high-society destination weddings in Udaipur, Lake Como, and Bali, high-fashion editorials for leading fashion houses, and tender newborn milestones for hundreds of families worldwide.
              </p>
              <p className="story-p">
                While our optical gear and post-production suites have evolved into state-of-the-art cinema systems, our fundamental premise remains unaltered: we treat your memories as sacred heirlooms.
              </p>

              <div className="story-stats-inline">
                <div className="inline-stat-item">
                  <span className="stat-gold">14+</span>
                  <span className="stat-label">Countries Documented</span>
                </div>
                <div className="inline-stat-item">
                  <span className="stat-gold">45+</span>
                  <span className="stat-label">Industry Accolades</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Studio Stats Section (Animated Counters) */}
      <section className="about-stats-section">
        <div className="container">
          <div className="stats-glass-container glass-panel">
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
            <span className="badge-gold">THE CORE ETHOS</span>
            <blockquote className="philosophy-quote">
              "{studioPhilosophy.quote}"
            </blockquote>
            <p className="philosophy-body">
              {studioPhilosophy.extended}
            </p>
            <div className="philosophy-signature-row">
              <div className="gold-accent-dot"></div>
              <span>Rudra Sharma & Anya Sen — Studio Founders</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our 5-Step Approach */}
      <section className="approach-section section-padding">
        <div className="container">
          <SectionTitle 
            badge="METICULOUS PROCESS"
            title={<>Our 5-Step <span className="gold-gradient-text">Creative Approach</span></>}
            subtitle="How we transition from initial concept to delivering an enduring heirloom gallery."
          />

          <div className="approach-steps-grid">
            {studioApproach.map((step) => (
              <div key={step.step} className="approach-step-card glass-card">
                <div className="step-number-tag">{step.step}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
                <div className="step-gold-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Team Section */}
      <section className="team-section section-padding">
        <div className="container">
          <SectionTitle 
            badge="CREATIVE MASTERS"
            title={<>Behind <span className="gold-gradient-text">The Lenses</span></>}
            subtitle="Meet the artists, stylists, and colorists who bring heart, precision, and passion to every shoot."
          />

          <div className="team-cards-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member-card">
                <div className="team-photo-wrap">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="team-photo-img"
                    loading="lazy"
                  />
                  <div className="team-social-overlay">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="team-social-link"
                      aria-label={`${member.name} Instagram`}
                    >
                      <InstagramIcon size={18} />
                      <span>{member.instagram}</span>
                    </a>
                  </div>
                </div>

                <div className="team-details">
                  <div className="team-header-row">
                    <div>
                      <h3 className="team-name">{member.name}</h3>
                      <p className="team-role">{member.role}</p>
                    </div>
                    <span className="team-exp-badge">{member.experience}</span>
                  </div>

                  <p className="team-bio">{member.bio}</p>

                  <div className="team-award-tag">
                    <Award size={14} className="award-icon" />
                    <span>{member.awards}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTASection 
        heading="Let's Begin Your Chapter."
        subtext="Schedule an in-person or virtual consultation with our creative directors to discuss your celebration."
        primaryBtnText="Schedule a Consultation"
        primaryBtnLink="/contact"
        secondaryBtnText="Explore Our Portfolio"
        secondaryBtnLink="/gallery"
      />
    </div>
  );
}
