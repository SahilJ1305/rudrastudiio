import React from "react";
import { Star, MapPin, ExternalLink, CheckCircle } from "lucide-react";
import { googleStudioInfo, googleReviews } from "../data/googleReviews";
import SectionTitle from "./SectionTitle";
import "./GoogleReviews.css";

// Official Google "G" SVG icon
function GoogleLogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  );
}

export default function GoogleReviews() {
  return (
    <section className="google-reviews-section section-padding">
      <div className="container">
        <SectionTitle 
          title="Google Client Reviews"
          subtitle="Real reviews and genuine experiences shared by our valued clients in Pune & Maharashtra on Google."
        />

        {/* Google Studio Summary Card */}
        <div className="google-summary-card">
          <div className="summary-left">
            <div className="google-icon-circle">
              <GoogleLogo size={32} />
            </div>
            <div className="summary-info">
              <div className="summary-title-row">
                <h3 className="summary-business-name">{googleStudioInfo.name}</h3>
                <span className="google-verified-badge">
                  <CheckCircle size={14} className="badge-check-icon" />
                  <span>Google Verified</span>
                </span>
              </div>
              <div className="summary-rating-row">
                <span className="rating-score">{googleStudioInfo.rating}</span>
                <div className="rating-stars" aria-label={`${googleStudioInfo.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="star-filled" />
                  ))}
                </div>
                <span className="reviews-count">({googleStudioInfo.totalReviews}+ reviews on Google)</span>
              </div>
              <div className="summary-location-row">
                <MapPin size={15} className="location-pin-icon" />
                <span className="location-text">{googleStudioInfo.address}</span>
              </div>
            </div>
          </div>

          <div className="summary-right">
            <a 
              href={googleStudioInfo.reviewUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-gold google-review-action-btn"
            >
              <GoogleLogo size={16} />
              <span>Review Us on Google</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="google-reviews-grid">
          {googleReviews.map((rev) => (
            <div key={rev.id} className="google-review-card">
              <div className="review-card-header">
                <div className="review-author-wrap">
                  <img src={rev.avatar} alt={rev.author} className="review-author-avatar" loading="lazy" />
                  <div className="review-author-meta">
                    <h4 className="review-author-name">{rev.author}</h4>
                    <span className="review-role">{rev.role}</span>
                  </div>
                </div>
                <div className="review-google-badge" title="Verified Google Review">
                  <GoogleLogo size={16} />
                </div>
              </div>

              <div className="review-stars-row">
                <div className="review-stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} className="star-filled" />
                  ))}
                </div>
                <span className="review-date">{rev.date}</span>
              </div>

              {rev.service && (
                <div className="review-service-pill">
                  <span>{rev.service}</span>
                </div>
              )}

              <p className="review-text">"{rev.review}"</p>

              <div className="review-footer-badge">
                <CheckCircle size={13} className="verified-check" />
                <span>Verified Google Review</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
