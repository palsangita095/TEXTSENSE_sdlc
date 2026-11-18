"use client";

import { useEffect, type RefObject } from "react";

export default function useChartDrawIn(
  ref: RefObject<HTMLElement | null>,
  trigger?: unknown,
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const graphLines = root.querySelectorAll<SVGElement>("svg polyline, svg path[fill='none']");

    graphLines.forEach((line, index) => {
      const geometry = line as SVGGeometryElement;

      if (typeof geometry.getTotalLength !== "function") return;

      const length = geometry.getTotalLength();

      line.style.strokeDasharray = String(length);
      line.style.strokeDashoffset = String(length);
      line.style.transition = `stroke-dashoffset 2s ease ${index * 0.2}s`;

      line.getBoundingClientRect();

      requestAnimationFrame(() => {
        line.style.strokeDashoffset = "0";
      });
    });

    const graphAreas = root.querySelectorAll<SVGElement>("svg path:not([fill='none'])");

    graphAreas.forEach((area, index) => {
      area.style.opacity = "0";
      area.style.transition = `opacity 1.5s ease ${index * 0.2}s`;

      requestAnimationFrame(() => {
        area.style.opacity = "0.08";
      });
    });
  }, [ref, trigger]);
}
