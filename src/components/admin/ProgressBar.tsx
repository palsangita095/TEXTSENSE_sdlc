"use client";

import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  width: number;
  colorClass: string;
}

export default function ProgressBar({ width, colorClass }: ProgressBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => setCurrent(width));
            });
            observer.unobserve(track);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={trackRef} className="h-2.5 overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full transition-[width] duration-[2000ms] ease-in-out ${colorClass}`}
        style={{ width: `${current}%` }}
      />
    </div>
  );
}
