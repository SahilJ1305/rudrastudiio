import React from "react";
import { Star, Quote, MapPin } from "lucide-react";
import "./TestimonialCard.css";

export default function TestimonialCard({ testimonial }) {
  if (!testimonial) return null;

  return (
    <div className="testimonial-card-root">
      <div className="testimonial-quote-icon">
        <Quote size={28} />
      </div>

      <div className="testimonial-stars">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <Star key={i} size={15} className="star-filled" />
        ))}
      </div>

      <p className="testimonial-quote-text">
        "{testimonial.quote}"
      </p>

      <div className="testimonial-author-row">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.client} 
          className="author-avatar"
          loading="lazy" 
        />
        <div className="author-details">
          <h4 className="author-name">{testimonial.client}</h4>
          <p className="author-role">{testimonial.role}</p>
          <div className="author-meta-info">
            <span className="author-shoot-tag">{testimonial.shootType}</span>
            {testimonial.location && (
              <span className="author-loc">
                <MapPin size={11} /> {testimonial.location}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
