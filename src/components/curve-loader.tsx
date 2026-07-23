"use client";

import { useRef, useEffect, useState } from "react";

export function CurveLoader() {
  const loader = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const initialCurve = 200;
  const duration = 600;
  let start: number | undefined;
  const [isMounted, setIsMounted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Cache dimensions to prevent Layout Thrashing during animation
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    setIsMounted(true);

    // Cache window width and loader height exactly once on mount
    dimensions.current.width = window.innerWidth;
    if (loader.current) {
      dimensions.current.height = loader.current.getBoundingClientRect().height;
    } else {
      dimensions.current.height = window.innerHeight + 200;
    }

    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500); // 500ms initial wait

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isMounted && path.current) {
      setPath(initialCurve);
    }
  }, [isMounted]);

  const animate = (timestamp: number) => {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    const newCurve = easeOutQuad(elapsed, initialCurve, -200, duration);
    if (path.current) {
      setPath(newCurve);
    }

    if (loader.current) {
      // Use the cached height here instead of calculating it again
      loader.current.style.top =
        easeOutQuad(elapsed, 0, -dimensions.current.height, duration) + "px";
    }

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      setIsFinished(true); // Completely unmount the component from React
    }
  };

  const easeOutQuad = (time: number, start: number, end: number, duration: number) => {
    return -end * (time /= duration) * (time - 2) + start;
  };

  const setPath = (curve: number) => {
    // Read from our cached dimensions instead of querying the DOM
    const width = dimensions.current.width;
    const height = dimensions.current.height;

    if (path.current) {
      path.current.setAttributeNS(
        null,
        "d",
        `M0 0
    L${width} 0
    L${width} ${height}
    Q${width / 2} ${height - curve} 0 ${height}
    L0 0`
      );
    }
  };

  if (!isMounted || isFinished) return null;

  return (
    <div
      ref={loader}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ height: "calc(100vh + 200px)" }}
    >
      <svg className="h-full w-full">
        {/* The fill uses the primary theme color (lime) */}
        <path
          ref={path}
          className="fill-primary"
        ></path>
      </svg>
    </div>
  );
}
