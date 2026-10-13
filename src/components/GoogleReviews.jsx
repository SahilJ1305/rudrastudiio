import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { googleReviews } from "../data/googleReviews";
import "./GoogleReviews.css";

// Elfsight "Google Reviews" widget (override with VITE_ELFSIGHT_APP_ID)
const ELFSIGHT_APP_ID = import.meta.env.VITE_ELFSIGHT_APP_ID || "ce1aabd5-98c4-4dc3-80ab-68578237753f";
const PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY || "";
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID || "";

// Official Google "G" icon
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

function Stars({ value }) {
  return (
    <div className="gr-stars" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={16} className={i <= Math.round(value) ? "gr-star-on" : "gr-star-off"} />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="gr-card">
      <header className="gr-card-head">
        {review.photo ? (
          <img src={review.photo} alt="" className="gr-avatar" referrerPolicy="no-referrer" loading="lazy" />
        ) : (
          <span className="gr-avatar gr-avatar-initial">{(review.author || "?").charAt(0).toUpperCase()}</span>
        )}
        <div className="gr-who">
          {review.authorUrl ? (
            <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="gr-author">{review.author}</a>
          ) : (
            <span className="gr-author">{review.author}</span>
          )}
          {review.date && <p className="gr-date">{review.date}</p>}
        </div>
        <GoogleLogo size={20} />
      </header>
      <Stars value={review.rating} />
      <p className="gr-text">{review.text}</p>
    </article>
  );
}

/** Reviews live from the Google Places API (New). */
function usePlaceReviews() {
  const enabled = Boolean(PLACES_API_KEY && PLACE_ID);
  const [state, setState] = useState({ status: enabled ? "loading" : "off" });

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=en`, {
      headers: {
        "X-Goog-Api-Key": PLACES_API_KEY,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews,googleMapsUri"
      },
      signal: controller.signal
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((place) => setState({ status: "ready", place }))
      .catch((err) => {
        if (err.name !== "AbortError") setState({ status: "error" });
      });
    return () => controller.abort();
  }, [enabled]);

  return state;
}

/** Embeds the third-party Elfsight Google Reviews widget. */
function ElfsightWidget() {
  useEffect(() => {
    if (document.querySelector('script[src*="elfsightcdn.com/platform.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div className={`elfsight-app-${ELFSIGHT_APP_ID} gr-widget`} data-elfsight-app-lazy />;
}

export default function GoogleReviews() {
  const { status, place } = usePlaceReviews();

  const apiReviews = (place?.reviews || [])
    .filter((r) => r.text?.text)
    .map((r) => ({
      author: r.authorAttribution?.displayName,
      authorUrl: r.authorAttribution?.uri,
      photo: r.authorAttribution?.photoUri,
      rating: r.rating,
      date: r.relativePublishTimeDescription,
      text: r.text.text
    }));

  const reviews = apiReviews.length ? apiReviews : googleReviews;

  return (
    <section className="gr-section section-padding">
      <div className="container">
        {ELFSIGHT_APP_ID ? (
          <ElfsightWidget />
        ) : (
          <>
            {status === "loading" && <p className="gr-note">Loading reviews from Google…</p>}
            {reviews.length > 0 && (
              <div className="gr-grid">
                {reviews.map((review, index) => (
                  <ReviewCard key={`${review.author}-${index}`} review={review} />
                ))}
              </div>
            )}
            {apiReviews.length > 0 && <p className="gr-attribution">Reviews provided by Google</p>}
          </>
        )}
      </div>
    </section>
  );
}
