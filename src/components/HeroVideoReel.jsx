import React from "react";
import { getMediaUrl } from "../utils/mediaUrl";
import "./HeroVideoReel.css";

// Forest drone footage (1080p), trimmed to start at 0:14 of media/videos-src/forest-drone-source.mp4
const HERO_VIDEO = getMediaUrl("/videos/hero/forest-hero.mp4");

/** Full-bleed background video for the homepage hero, looping forever. */
export default function HeroVideoReel() {
  return (
    <div className="hero-reel" aria-hidden="true">
      <video
        className="hero-reel-video is-front"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
