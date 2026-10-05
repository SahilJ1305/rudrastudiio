import React, { useEffect, useState, useRef } from "react";
import "./StatsCounter.css";

export default function StatsCounter({ targetValue, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = parseInt(targetValue, 10);
    if (isNaN(end)) return;

    const totalSteps = 60;
    const stepTime = Math.max(Math.floor(duration / totalSteps), 16);
    const stepIncrement = Math.ceil(end / totalSteps);

    const timer = setInterval(() => {
      start += stepIncrement;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, targetValue, duration]);

  return (
    <span ref={elementRef} className="stats-counter-number">
      {count}
      <span className="stats-suffix">{suffix}</span>
    </span>
  );
}
