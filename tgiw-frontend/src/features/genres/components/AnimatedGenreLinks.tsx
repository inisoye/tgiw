import React from 'react';

import { useCircleStartPosition, useFinalPositions } from '../hooks';
import { useWindowSize } from '../hooks/useWindowSize';
import { GenreLink } from './GenreLink';

const S = {
  flex: { flex: 1 },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
};

interface Dimensions {
  width: number;
  height: number;
}

export function AnimatedCircles() {
  const viewDimensions = useWindowSize();

  const isCanvasReady = viewDimensions !== undefined;

  return (
    <div className="">
      <p>stuff</p>
      {isCanvasReady && (
        <AnimatedCirclesInner
          dimensions={viewDimensions}
        ></AnimatedCirclesInner>
      )}
    </div>
  );
}

export function AnimatedCirclesInner({
  dimensions,
}: {
  dimensions:
    | Dimensions
    | {
        width: undefined;
        height: undefined;
      };
}) {
  const circles = useCircleStartPosition(dimensions);
  const finalDimensions = useFinalPositions(circles);

  //   console.log(finalDimensions);

  return (
    <div className="relative w-[900px] h-[900px]">
      {circles.map((p, i) => {
        return (
          <GenreLink
            key={i}
            translateX={p.x}
            translateY={p.y}
            finalX={finalDimensions[i]?.x}
            finalY={finalDimensions[i]?.y}
          />
        );
      })}
    </div>
  );
}
