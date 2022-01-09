import * as React from 'react';
// import { motion } from 'framer-motion'; *REMOVED TEMPORARILY FOR BUNDLE SIZE
import Link from 'next/link';

import { Position } from '../types';

export const circleDiameter = 128;
const circleRadius = circleDiameter / 2;
interface GenreLinkProps {
  id: string;
  name: string;
  color: string;
  initialPosition: Position;
  finalPosition: Position;
}

export const GenreLink: React.FunctionComponent<GenreLinkProps> = ({
  id,
  name,
  color,
  initialPosition,
  finalPosition,
}) => {
  return (
    <>
      {/* eslint-disable-next-line @next/next/link-passhref */}
      <Link href={`/genres/${id}`}>
        {/* <motion.a
          className="absolute inline-flex items-center justify-center px-2 py-1 text-sm text-center text-white transition-all duration-1000 ease-in-out rounded-full cursor-pointer"
          initial={{ ...initialPosition, backgroundColor: color }}
          animate={{
            ...finalPosition,
            width: circleDiameter,
            height: circleDiameter,
            borderRadius: circleRadius,
          }}
          transition={{ duration: 1 }}
        >
          <span className="p-4">{name}</span>
        </motion.a> */}
      </Link>
    </>
  );
};
