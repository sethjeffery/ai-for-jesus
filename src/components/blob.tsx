"use client";

import { createNoise2D } from "simplex-noise";
import { spline } from "@georgedoescode/spline";
import { useEffect, useRef } from "react";
import cn from "classnames";

function doWork(svg: SVGSVGElement, path: SVGPathElement) {
  svg.style.setProperty("--startColor", `hsl(0, 100%, 75%)`);
  svg.style.setProperty("--stopColor", `hsl(0, 100%, 75%)`);

  let hueNoiseOffset = 0;
  let noiseStep = 0.002;

  const noise2D = createNoise2D();
  const points = createPoints();

  (function animate() {
    path.setAttribute("d", spline(points, 1, true));

    // for every point...
    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
      const nX = noise2D(point.noiseOffsetX, point.noiseOffsetX);
      const nY = noise2D(point.noiseOffsetY, point.noiseOffsetY);
      // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
      const x = map(nX, -1, 1, point.originX - 100, point.originX + 100);
      const y = map(nY, -1, 1, point.originY - 100, point.originY + 100);

      // update the point's current coordinates
      point.x = x;
      point.y = y;

      // progress the point's x, y values through "time"
      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;
    }

    const hueNoise = noise2D(hueNoiseOffset, hueNoiseOffset);
    const hue = map(hueNoise, -1, 1, 0, 360);

    svg.style.setProperty("--startColor", `hsl(${hue}, 100%, 90%)`);
    svg.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 90%)`);

    hueNoiseOffset += noiseStep / 6;

    requestAnimationFrame(animate);
  })();

  function map(
    n: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  }

  function createPoints() {
    const points = [];
    // how many points do we need
    const numPoints = 6;
    // used to equally space each point around the circle
    const angleStep = (Math.PI * 2) / numPoints;
    // the radius of the circle
    const rad = 75;

    for (let i = 1; i <= numPoints; i++) {
      // x & y coordinates of the current point
      const theta = i * angleStep;

      const x = 100 + Math.cos(theta) * rad;
      const y = 100 + Math.sin(theta) * rad;

      // store the point's position
      points.push({
        x: x,
        y: y,
        // we need to keep a reference to the point's original point for when we modulate the values later
        originX: x,
        originY: y,
        // more on this in a moment!
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
      });
    }

    return points;
  }
}

export default function Blob({ className }: { className: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current && svgRef.current)
      doWork(svgRef.current, pathRef.current);
  }, [pathRef]);

  return (
    <svg
      className={cn("pointer-events-none", className)}
      viewBox="0 0 200 200"
      ref={svgRef}
    >
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="var(--startColor)" />
          <stop offset="100%" stop-color="var(--stopColor)" />
        </linearGradient>
      </defs>
      <path d="" fill="url('#gradient')" ref={pathRef}></path>
    </svg>
  );
}
