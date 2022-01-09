import { Dimensions, Position } from '../types';
import { circleDiameter } from '../components';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export const getInitialCirclesPositions = (
  viewDimensions: Dimensions,
  dataLength: number,
  circleDiameter: number
): Position[] => {
  const { width, height } = viewDimensions;
  const diagonal = Math.hypot(width as number, height as number);
  const diagonalHalf = diagonal / 2;
  const angle = (2 * Math.PI) / dataLength;

  const positions = [];

  for (let i = 0; i < dataLength; i++) {
    const randomOffsetAngle = random(-angle * 0.4, angle * 0.4);
    const randomOffsetDistance = random(0, circleDiameter);

    const distance = diagonalHalf + circleDiameter + randomOffsetDistance;
    const currentAngle = angle * i + randomOffsetAngle;
    const x = Math.sin(currentAngle) * distance;
    const y = Math.cos(currentAngle) * distance;

    positions.push({ x, y });
  }

  return positions;
};

//  TODO: Function logic still not working properly. Not currently in use.
export const getFinalCirclesPositions = (
  initialCirclesPositions: Position[]
) => {
  const centeredPositions = initialCirclesPositions.map(({ x, y }) => ({
    x: -x * 0.001,
    y: -y * 0.001,
  }));

  const finalPositions: Position[] = [];

  for (let i = 0; i < centeredPositions.length; i++) {
    for (let j = i; j < centeredPositions.length; j++) {
      const centeredPositionA = centeredPositions[i];
      const centeredPositionB = centeredPositions[j];

      finalPositions[i] = {} as Position;
      finalPositions[j] = {} as Position;

      const dx = centeredPositionB.x - centeredPositionA.x;
      const dy = centeredPositionB.y - centeredPositionA.y;
      const distanceBetweenCenters = Math.hypot(dx, dy);
      const areOverlapping = distanceBetweenCenters < circleDiameter;

      if (areOverlapping) {
        const overlapDistance = circleDiameter - distanceBetweenCenters;
        const percentOverlap = overlapDistance / circleDiameter;

        const halfPercent = percentOverlap * 0.5;

        finalPositions[i].x = centeredPositionA.x - dx * halfPercent;
        finalPositions[i].y = centeredPositionA.y - dy * halfPercent;

        finalPositions[j].x = centeredPositionB.x - dx * halfPercent;
        finalPositions[j].y = centeredPositionB.y - dy * halfPercent;
      }
    }
  }

  return finalPositions;
};
