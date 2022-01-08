import * as React from 'react';
import { motion } from 'framer-motion';

interface GenreLinkProps {
  translateX: number;
  translateY: number;
  finalX: number;
  finalY: number;
}

export const circleDiameter = 128;
const circleRadius = circleDiameter / 2;

export const GenreLink: React.FunctionComponent<GenreLinkProps> = ({
  translateX,
  translateY,
  finalX,
  finalY,
}) => {
  return (
    <motion.div
      initial={{ x: translateX, y: translateY }}
      animate={{
        x: finalX,
        y: finalY,
        position: 'absolute',
        width: circleDiameter,
        height: circleDiameter,
        borderRadius: circleRadius,
        backgroundColor: '#ff0000',
      }}
      transition={{ duration: 3 }}
    />
  );
};
