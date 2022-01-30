import * as React from 'react';

import { getGaugeColor } from '..';

interface TrackFeatureGaugeProps {
  featureName: string;
  featureValue: number;
}

export const TrackFeatureGauge: React.FunctionComponent<
  TrackFeatureGaugeProps
> = ({ featureName, featureValue }) => {
  const roundedValue = Math.round(featureValue);

  return (
    <>
      <div aria-hidden className="flex items-center justify-between pt-4 h-11">
        <p className="text-sm capitalize text-tgiwPurplish text-opacity-70">
          {featureName}
        </p>

        <div className="relative flex items-center w-3/4 h-5 px-2 ml-10 rounded-full shrink-0 bg-tgiwBlue">
          <div className="absolute flex justify-center w-4 h-3 rounded-full bg-tgiwOrange percentage-gauge">
            <span className="text-xs text-center -translate-y-6 text-tgiwPurplish text-opacity-70">
              {roundedValue}%
            </span>
          </div>
        </div>
      </div>

      {/* <p className="sr-only">Popularity score is {roundedValue}%</p> */}

      <style jsx>{`
        .percentage-gauge {
          left: ${`${roundedValue}%`};
          background-color: ${getGaugeColor(roundedValue)};
        }
      `}</style>
    </>
  );
};
