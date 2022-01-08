import { useMemo } from 'react';
import { motion, useMotionValue } from 'framer-motion';

import { circleDiameter } from '../components/GenreLink';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export const numberOfCircles = 10;

interface Dimensions {
  width: number;
  height: number;
}

export const useCircleStartPosition = (
  dimensions:
    | Dimensions
    | {
        width: undefined;
        height: undefined;
      }
) => {
  const circles = useMemo(() => {
    const { width, height } = dimensions;
    const diagonal = Math.hypot(width as number, height as number);
    const diagonalHalf = diagonal / 2;
    const circles = [];

    const angle = (2 * Math.PI) / numberOfCircles;

    for (let i = 0; i < numberOfCircles; i++) {
      const randomOffsetAngle = random(-angle * 0.4, angle * 0.4);
      const randomOffsetDistance = random(0, circleDiameter);

      const distance = diagonalHalf + circleDiameter + randomOffsetDistance;
      const currentAngle = angle * i + randomOffsetAngle;
      const x = Math.sin(currentAngle) * distance;
      const y = Math.cos(currentAngle) * distance;

      console.log(x, y);

      circles.push({ x: x, y: y });
    }
    return circles;
  }, [dimensions]);

  return circles;
};

export const useFinalPositions = (circles) => {
  console.log(circles);

  const centeredCircles = circles.map((c) => {
    return { x: -c.x * 0.001, y: -c.y * 0.001 };
  });

  console.log(centeredCircles);

  console.log(circles);

  const finalDimensions = useMemo(() => {
    const newCircles: any[] = [];

    // Colision detection
    for (let i = 0; i < centredCircles.length; i++) {
      for (let j = i; j < centredCircles.length; j++) {
        const circleA = centredCircles[i];
        const circleB = centredCircles[j];

        newCircles[i] = {};
        newCircles[j] = {};

        const dx = circleB.x - circleA.x;
        const dy = circleB.y - circleA.y;
        const distanceBetweenCenters = Math.hypot(dx, dy);
        const areOverlapping = distanceBetweenCenters < circleDiameter;

        if (areOverlapping) {
          const overlapDistance = circleDiameter - distanceBetweenCenters;
          const percentOverlap = overlapDistance / circleDiameter;

          const halfPercent = percentOverlap * 0.5;

          newCircles[i].x = circleA.x - dx * halfPercent;
          newCircles[i].y = circleA.y - dy * halfPercent;

          newCircles[j].x = circleB.x - dx * halfPercent;
          newCircles[j].y = circleB.y - dy * halfPercent;
        }
      }
    }

    console.log(newCircles);

    return newCircles;
  }, [circles]);

  return finalDimensions;
};
